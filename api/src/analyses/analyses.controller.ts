import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AnalysesService } from './analyses.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('analyses')
export class AnalysesController {
  constructor(private readonly analysesService: AnalysesService) {}

  @Public()
  @Get('/user/:userId')
  findAnalysesByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.analysesService.findAnalysesByUser(userId);
  }

  @Public()
  @Get('/:id')
  findAnalysisById(@Param('id', ParseIntPipe) id: number) {
    return this.analysesService.findAnalysisById(id);
  }

  @Public()
  @Get('/user/:userId/testType/:testTypeId/:testDate')
  findUserAnalysesByTestType(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('testTypeId', ParseIntPipe) testTypeId: number,
    @Param('testDate') testDate: string,
  ) {
    const parsedDate = new Date(testDate); 
    return this.analysesService.findUserAnalysesByTestType(
      userId,
      testTypeId,
      parsedDate,
    );
  }
}
