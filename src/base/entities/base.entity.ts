import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the entity',
    example: '3ef45678-abcd-90ab-cdef-1234567890ab',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The date and time when the entity was created',
    example: '2024-01-01T00:00:00.000Z',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the entity was last updated',
    example: '2024-01-02T00:00:00.000Z',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'The date and time when the entity was deleted',
    example: '2024-01-03T00:00:00.000Z',
  })
  @DeleteDateColumn({ type: 'timestamptz' })
  @Expose()
  deletedAt: Date;
}
