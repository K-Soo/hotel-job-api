import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employer } from '../../entities/employer.entity';

@Entity()
export class Company {
  @OneToOne(() => Employer, (employer) => employer.company, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employer_id', referencedColumnName: 'id' })
  employer: Employer;

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  businessRegistrationNumber: string;

  @Column()
  companyName: string;

  @Column()
  businessOwner: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  @Column()
  managerName: string;

  @Column()
  managerEmail: string;

  @Column()
  managerNumber: string;
}
