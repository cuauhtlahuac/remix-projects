import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useContext, useState } from 'react';
import { Tab, ThemeContext } from '~/components'
import { createTabs } from '~/mocks'

export const loader: LoaderFunction = () => {
  return createTabs();
}

export default function Index() {
  const data = useLoaderData();
  const [tabData, setTabData] = useState(data[0])
  console.log({ tabData })
  const handleOnSelected = (selected: any) => {
    setTabData(selected)
  }
  return (
    <div>
      <Tab.Group data={data}>
        <Tab.List>
          {data.map(({ header }:
            {
              header: string,
            }, index: number) => (
            <Tab index={index} key={header} onPress={handleOnSelected}>{header}</Tab>
          ))
          }
        </Tab.List>
        <Tab.Panels>
          {tabData.body.map(({ title, detail }) => (<Tab.Panel>
            <h3>{title}</h3>
            <p>{detail}</p>
          </Tab.Panel>))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
