import { Expense } from '@/entities/Expense';

import { BaseRepository } from '@/repositories/base/BaseRepository';
import { ExpenseRepository } from '@/repositories/ExpenseRepository';

const FILE_PATH = 'src/data/Expense.data.csv';

export class ExpenseService {
    private static instance: ExpenseService;
    private expensesRepository: BaseRepository<Expense>;

    private constructor(expensesRepository: BaseRepository<Expense>) {
        this.expensesRepository = expensesRepository;
    }

    public static async getInstance(): Promise<ExpenseService> {
        if (!ExpenseService.instance) {
            const expensesRepository = new ExpenseRepository(FILE_PATH);
            await expensesRepository.init();
            ExpenseService.instance = new ExpenseService(expensesRepository);
        }

        return ExpenseService.instance;
    }

    public async getExpenses(): Promise<Expense[]> {
        const expenses = await this.expensesRepository.findAll();
        return expenses;
    }

    public async getExpense(expenseId: string): Promise<Expense> {
        return await this.expensesRepository.findOne(expenseId);
    }

    public async addExpense(expense: Expense): Promise<boolean> {
        return await this.expensesRepository.create(expense);
    }

    public async updateExpense(expense: Expense): Promise<boolean> {
        return await this.expensesRepository.update(expense.id, expense);
    }

    public async deleteExpense(expenseId: string): Promise<boolean> {
        return await this.expensesRepository.delete(expenseId);
    }
}
