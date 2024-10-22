import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AnalysesService } from './analyses.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('analyses')
export class AnalysesController {
  constructor(private readonly analysesService: AnalysesService) {}

  @Public()
  @Get('/:userId')
  getAnalysesByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.analysesService.findAnalysesByUser(userId);
  }
}
