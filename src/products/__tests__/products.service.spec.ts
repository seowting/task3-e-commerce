import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

const mockProductRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: MockRepository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository(),
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<MockRepository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = [{ id: 1, name: 'Test Product', price: 100 }];
      repository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = { id: 1, name: 'Test Product', price: 100 };
      repository.findOne.mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw an error if product not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow('Product not found');
    });
  });
});
