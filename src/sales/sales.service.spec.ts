import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './create-sale.dto';

describe('SalesService', () => {
  let service: SalesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    sale: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createSale', () => {
    it('deve criar uma nova venda', async () => {
      const createSaleDto: CreateSaleDto = {
        date: new Date(),
      };

      const expectedResult = {
        id: 1,
        date: createSaleDto.date,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.sale.create.mockResolvedValue(expectedResult);

      const result = await service.createSale(createSaleDto);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.sale.create).toHaveBeenCalledWith({
        data: {
          date: createSaleDto.date,
        },
      });
    });
  });

  describe('getSales', () => {
    it('deve retornar todas as vendas', async () => {
      const expectedResult = [
        {
          id: 1,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          purchases: [],
        },
      ];

      mockPrismaService.sale.findMany.mockResolvedValue(expectedResult);

      const result = await service.getSales();

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.sale.findMany).toHaveBeenCalledWith({
        include: {
          purchases: true,
        },
      });
    });
  });

  describe('getSaleById', () => {
    it('deve retornar uma venda específica', async () => {
      const saleId = 1;
      const expectedResult = {
        id: saleId,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        purchases: [],
      };

      mockPrismaService.sale.findUnique.mockResolvedValue(expectedResult);

      const result = await service.getSaleById(saleId);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.sale.findUnique).toHaveBeenCalledWith({
        where: { id: saleId },
        include: {
          purchases: true,
        },
      });
    });
  });
}); 