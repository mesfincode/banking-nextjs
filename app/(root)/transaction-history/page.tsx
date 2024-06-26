import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagenation';
import TransactionTable from '@/components/TransactionTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect('/sign-in')
  const accounts = await getAccounts({ userId: loggedIn.$id })
  if (!accounts) return;
  const accountData = accounts?.data;
  const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  const rowsPerPages = 10;
  const totalPages = Math.ceil(account.length/rowsPerPages)
  const indexOfLastTransaction= currentPage* rowsPerPages;
  const indexOfFirstTransaction= indexOfLastTransaction - rowsPerPages;
  const currentTransactions = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  
  return (
    <div className='transactions'>
      <div className='transactions-header'>
        <HeaderBox
          title="Transaction History"
          subtext='See your bank Details and transactions'

        />
      </div>

      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-18 font-bold text-white'>
              {account?.data.name}
            </h2>
            <p className='text-14 text-blue-25'>
              {account?.data.officialName}
            </p>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
              ●●●● ●●●● ●●●● ●●●● {account?.data.mask}

            </p>
          </div>
          <div className='transactions-account-balance'>
            <p className='text-14'>Current balance</p>
            <p className='text-24 text-center font-bold'>{formatAmount(account?.data.currentBalance)}</p>
          </div>

        </div>
        <section className='flex w-full flex-col gap-6'>
          <TransactionTable transactions={currentTransactions} />
          {
                            totalPages > 1 && (
                                <Pagination 
                        totalPages={totalPages}
                        page={currentPage}

                        />
                            )
                        }
        </section>
      </div>
    </div>
  )
}

export default TransactionHistory
