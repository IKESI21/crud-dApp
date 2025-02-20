'use client';

import { PublicKey } from '@solana/web3.js';
import {
  useCrudappProgram,
  useCrudappProgramAccount,
} from './crudapp-data-access';
import { useState } from 'react';
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';

export function CrudappCreate() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const wallet = useAnchorWallet();
  const { createEntry } = useCrudappProgram();

  const isFormValid = title.trim() !== '' && message.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid && wallet?.publicKey) {
      createEntry.mutateAsync({ title, message, owner: wallet.publicKey });
    }
  };
  if (!wallet?.publicKey) {
    return <p>Connect your wallet to create an entry</p>;
  }
  return (
    <div>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        className='input input-bordered w-full max-w-xs'
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Message'
        className='textarea textarea-bordered w-full max-w-xs'
      />
      <button
        className='btn btn-xs lg:btn-md btn-primary'
        onClick={handleSubmit}
        disabled={createEntry.isPending || !isFormValid}
      >
        Create {createEntry.isPending && '...'}
      </button>
    </div>
  );
}

export function CrudappList() {
  const { accounts, getProgramAccount } = useCrudappProgram();

  if (getProgramAccount.isLoading) {
    return <span className='loading loading-spinner loading-lg'></span>;
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className='alert alert-info flex justify-center'>
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className='loading loading-spinner loading-lg'></span>
      ) : accounts.data?.length ? (
        <div className='grid md:grid-cols-2 gap-4'>
          {accounts.data?.map((account) => (
            <CrudappCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className='text-center'>
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  );
}

function CrudappCard({ account }: { account: PublicKey }) {
  const { accountQuery, updateEntry, deleteEntry } = useCrudappProgramAccount({
    account,
  });

  const { publicKey } = useWallet();
  const [message, setMessage] = useState('');
  const title = accountQuery.data?.title;
  const isFormValid = message.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid && publicKey && title) {
      updateEntry.mutateAsync({ title, message, owner: publicKey });
    }
  };
  if (!publicKey) {
    return <p>Connect your wallet to create an entry</p>;
  }

  return accountQuery.isLoading ? (
    <span className='loading loading-spinner loading-lg'></span>
  ) : (
    <div>
      <div className='card card-compact bg-base-100 shadow-xl'>
        <div className='card-body items-center text-center'>
          <h2
            className='card-title justify-center text-2xl cursor-pointer'
            onClick={() => accountQuery.refetch()}
          >
            {accountQuery.data?.title}
          </h2>
          <p>{accountQuery.data?.message}</p>
          <div className='card-actions justify-around'>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Message'
              className='textarea textarea-bordered w-full max-w-xs'
            />
            <button
              className='btn btn-xs lg:btn-md btn-primary'
              onClick={handleSubmit}
              disabled={updateEntry.isPending || !isFormValid}
            >
              Update {updateEntry.isPending && '...'}
            </button>
            <button
              className='btn btn-xs lg:btn-md btn-error'
              onClick={() => {
                const title = accountQuery.data?.title;
                if (title) {
                  return deleteEntry.mutateAsync(title);
                }
              }}
              disabled={deleteEntry.isPending}
            >
              Delete {deleteEntry.isPending && '...'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
