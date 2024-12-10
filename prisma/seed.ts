import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  await prisma.purchaseProduct.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();

  // Criar produtos
  const produtos = [
    {
      name: 'Pastilha de Freio Dianteira',
      description: 'Pastilha de freio para veículos populares, alta durabilidade',
      sku: 'FRE-PAS-001',
      price: new Decimal('189.90'),
      stockQuantity: 50,
      manufacturer: 'Fras-le',
      brand: 'Fras-le Max',
      category: 'Freios',
      weight: new Decimal('0.8'),
      dimensions: '15x10x5 cm',
      barcode: '7891234567890'
    },
    {
      name: 'Amortecedor Dianteiro',
      description: 'Amortecedor para suspensão dianteira, compatível com Gol/Parati/Saveiro',
      sku: 'SUS-AMO-002',
      price: new Decimal('379.90'),
      stockQuantity: 30,
      manufacturer: 'Cofap',
      brand: 'Cofap Turbogás',
      category: 'Suspensão',
      weight: new Decimal('3.5'),
      dimensions: '45x15x15 cm',
      barcode: '7891234567891'
    },
    {
      name: 'Filtro de Óleo',
      description: 'Filtro de óleo do motor, compatível com diversos modelos',
      sku: 'MOT-FIL-003',
      price: new Decimal('39.90'),
      stockQuantity: 100,
      manufacturer: 'Tecfil',
      brand: 'Tecfil Premium',
      category: 'Motor',
      weight: new Decimal('0.3'),
      dimensions: '10x10x12 cm',
      barcode: '7891234567892'
    },
    {
      name: 'Correia Dentada',
      description: 'Correia de distribuição para motores 1.0 a 1.6',
      sku: 'MOT-COR-004',
      price: new Decimal('89.90'),
      stockQuantity: 45,
      manufacturer: 'Gates',
      brand: 'Gates PowerGrip',
      category: 'Motor',
      weight: new Decimal('0.2'),
      dimensions: '20x15x3 cm',
      barcode: '7891234567893'
    },
    {
      name: 'Bateria 60Ah',
      description: 'Bateria automotiva 60Ah, livre de manutenção',
      sku: 'ELE-BAT-005',
      price: new Decimal('459.90'),
      stockQuantity: 20,
      manufacturer: 'Moura',
      brand: 'Moura Clean',
      category: 'Elétrica',
      weight: new Decimal('14.5'),
      dimensions: '25x17x22 cm',
      barcode: '7891234567894'
    },
    {
      name: 'Vela de Ignição',
      description: 'Jogo de velas de ignição para motores flex',
      sku: 'ELE-VEL-006',
      price: new Decimal('129.90'),
      stockQuantity: 60,
      manufacturer: 'NGK',
      brand: 'NGK Iridium',
      category: 'Elétrica',
      weight: new Decimal('0.2'),
      dimensions: '10x5x5 cm',
      barcode: '7891234567895'
    },
    {
      name: 'Radiador',
      description: 'Radiador de água completo para veículos 1.0 a 1.6',
      sku: 'ARR-RAD-007',
      price: new Decimal('599.90'),
      stockQuantity: 15,
      manufacturer: 'Visconde',
      brand: 'Visconde Premium',
      category: 'Arrefecimento',
      weight: new Decimal('4.5'),
      dimensions: '65x45x3 cm',
      barcode: '7891234567896'
    },
    {
      name: 'Kit Embreagem',
      description: 'Kit completo de embreagem (platô, disco e rolamento)',
      sku: 'TRA-EMB-008',
      price: new Decimal('789.90'),
      stockQuantity: 25,
      manufacturer: 'LUK',
      brand: 'LUK RepSet',
      category: 'Transmissão',
      weight: new Decimal('5.2'),
      dimensions: '30x30x20 cm',
      barcode: '7891234567897'
    },
    {
      name: 'Bomba de Combustível',
      description: 'Bomba elétrica de combustível completa',
      sku: 'COM-BOM-009',
      price: new Decimal('299.90'),
      stockQuantity: 35,
      manufacturer: 'Bosch',
      brand: 'Bosch Automotive',
      category: 'Combustível',
      weight: new Decimal('0.9'),
      dimensions: '15x10x10 cm',
      barcode: '7891234567898'
    },
    {
      name: 'Óleo Motor 5W30',
      description: 'Óleo sintético para motor 5W30, embalagem 1L',
      sku: 'MOT-OLE-010',
      price: new Decimal('49.90'),
      stockQuantity: 150,
      manufacturer: 'Petronas',
      brand: 'Petronas Syntium',
      category: 'Lubrificantes',
      weight: new Decimal('1.0'),
      dimensions: '10x10x25 cm',
      barcode: '7891234567899'
    }
  ];

  for (const produto of produtos) {
    await prisma.product.create({
      data: produto
    });
  }

  // Criar algumas vendas de exemplo
  const venda1 = await prisma.sale.create({
    data: {
      customerName: 'José da Silva',
      customerEmail: 'jose.silva@email.com',
      customerPhone: '(11) 98765-4321',
      totalAmount: new Decimal('629.80'),
      paymentMethod: 'CREDIT_CARD',
      status: 'PAID',
      notes: 'Cliente regular'
    }
  });

  const venda2 = await prisma.sale.create({
    data: {
      customerName: 'Maria Oliveira',
      customerEmail: 'maria.oliveira@email.com',
      customerPhone: '(11) 91234-5678',
      totalAmount: new Decimal('459.90'),
      paymentMethod: 'PIX',
      status: 'PENDING',
      notes: 'Primeira compra'
    }
  });

  // Buscar produtos criados
  const pastilhaFreio = await prisma.product.findFirst({
    where: { sku: 'FRE-PAS-001' }
  });

  const bateria = await prisma.product.findFirst({
    where: { sku: 'ELE-BAT-005' }
  });

  // Criar compras vinculadas às vendas
  if (pastilhaFreio && bateria) {
    await prisma.purchase.create({
      data: {
        saleId: venda1.id,
        totalAmount: new Decimal('629.80'),
        status: 'CONFIRMED',
        products: {
          create: [
            {
              productId: pastilhaFreio.id,
              quantity: 2,
              unitPrice: new Decimal('189.90'),
              totalPrice: new Decimal('379.80')
            },
            {
              productId: bateria.id,
              quantity: 1,
              unitPrice: new Decimal('459.90'),
              totalPrice: new Decimal('459.90')
            }
          ]
        }
      }
    });
  }

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 