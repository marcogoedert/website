import { Account } from '@/entities/Account';
import { AccountRepository } from '@/repositories/AccountRepository';
import { BaseRepository } from '@/repositories/base/BaseRepository';

const ACCOUNT_DATA_FILE_PATH = 'src/data/BankAccount.data.csv';

export class BankAccountService {
    private static instance: BankAccountService;
    private accountsRepository: BaseRepository<Account>;

    private constructor(accountsRepository: BaseRepository<Account>) {
        this.accountsRepository = accountsRepository;
    }

    public static async getInstance(): Promise<BankAccountService> {
        if (!BankAccountService.instance) {
            const accountsRepository = new AccountRepository(
                ACCOUNT_DATA_FILE_PATH
            );
            await accountsRepository.init();
            BankAccountService.instance = new BankAccountService(accountsRepository);
        }

        return BankAccountService.instance;
    }

    public async getAccounts(): Promise<Account[]> {
        const accounts = await this.accountsRepository.findAll();
        
        return accounts;
    }

    public async getAccount(accountId: string): Promise<Account> {
        return await this.accountsRepository.findOne(accountId);
    }

    public async addAccount(account: Account): Promise<boolean> {
        return await this.accountsRepository.create(account);
    }

    public async updateAccount(account: Account): Promise<boolean> {
        return await this.accountsRepository.update(account.id, account);
    }

    public async deleteAccount(accountId: string): Promise<boolean> {
        return await this.accountsRepository.delete(accountId);
    }
}
