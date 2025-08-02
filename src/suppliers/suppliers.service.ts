import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';


@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier>{
    const supplier = this.suppliersRepository.create(createSupplierDto);
    return await this.suppliersRepository.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    return await this.suppliersRepository.find()
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findOne({ where: { id_supplier: id } });
    if (!supplier) {
      throw new NotFoundException(`Supplier with Id: ${id} is not found`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.findOne(id)
    await this.suppliersRepository.update(id, updateSupplierDto)
    return this.findOne(id)
  }

  async remove(id: string) {
    const supplier = await this.findOne(id)
    await this.suppliersRepository.softRemove(supplier);
    return { message: `The supplier ${supplier.name} has been removed` }
  }
}
