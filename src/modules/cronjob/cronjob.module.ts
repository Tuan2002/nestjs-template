import { SharedModule } from '@modules/shared/shared.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SharedModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CronjobModule {}
