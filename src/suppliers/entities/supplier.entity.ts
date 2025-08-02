import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id_supplier: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
  @OneToMany(() => Product, product => product.supplier)
  products: Product[];

}
