import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { Tab } from '~/components'
import { createTabs } from '~/mocks'

export const loader: LoaderFunction = () => {
  return createTabs();
}

export default function Index() {
  const data = useLoaderData();
  // no prop-drilling jamás
  return (
    <div className='w-4/4 p-6'>
      <Tab.Group defaultIndex={2}>
        <Tab.List>
          {data.map((
            { header, id }: { header: string, id: string, },
            index: number) => (
            <Tab key={id} index={index}>
              {header}
            </Tab>
          ))
          }
        </Tab.List>
        <Tab.Panels>
          {(index: number) => data[index].body.map(
            ({ title = 'title', detail = 'detail' }) => (
              <Tab.Panel key={title + index}>
                <h3 className="text-base font-bold font-medium text-black-900 mb-1">{title}</h3>
                <p className="text-sm font-light text-gray-700 mb-2">{detail}</p>
              </Tab.Panel>
            )
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
