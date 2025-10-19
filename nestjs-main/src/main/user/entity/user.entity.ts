import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Product } from '../../product/entity/product.entity';
import { UserRole } from '../../util/enums/user-role';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({nullable: true})
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @Column({
    type: 'varchar',
    length: 50,
    default: UserRole.user,
  })
  role: UserRole;
}
