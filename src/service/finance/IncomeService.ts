import { Income } from '@/entities/Income';

import { BaseRepository } from '@/repositories/base/BaseRepository';
import { IncomeRepository } from '@/repositories/IncomeRepository';

const FILE_PATH = 'src/data/Income.data.csv';

export class IncomeService {
    private static instance: IncomeService;
    private incomesRepository: BaseRepository<Income>;

    private constructor(incomesRepository: BaseRepository<Income>) {
        this.incomesRepository = incomesRepository;
    }

    public static async getInstance(): Promise<IncomeService> {
        if (!IncomeService.instance) {
            const incomesRepository = new IncomeRepository(FILE_PATH);
            await incomesRepository.init();
            IncomeService.instance = new IncomeService(incomesRepository);
        }

        return IncomeService.instance;
    }

    public async getIncomes(): Promise<Income[]> {
        const incomes = await this.incomesRepository.findAll();
        return incomes;
    }

    public async getIncome(incomeId: string): Promise<Income> {
        return await this.incomesRepository.findOne(incomeId);
    }

    public async addIncome(income: Income): Promise<boolean> {
        return await this.incomesRepository.create(income);
    }

    public async updateIncome(income: Income): Promise<boolean> {
        return await this.incomesRepository.update(income.id, income);
    }

    public async deleteIncome(incomeId: string): Promise<boolean> {
        return await this.incomesRepository.delete(incomeId);
    }
}
