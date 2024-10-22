
// * biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */
'use client';
import { useState } from 'react';
import VoterCard from './voterCard';
import { voter } from '@prisma/client';

export default function VoterList() {
     const [data, setData] = useState<voter[]>();

     fetch(`http://localhost:3000/api/voters`, { method: 'GET', })
          .then(async (response) => setData(await response.json())).finally(()=> console.log("Fim do fect"))


     return (
          <div className='grid grid-cols-4 p-1'>
               {
                    data?.map(({id, votecode, name }: voter) => {
                         return (
                              <VoterCard key={id} nome={name} codigoVotacao={votecode} />
                         )
                    })
               }
               {/* <VoterCard  nome="Danilo" codigoVotacao={123431} /> */}
          </div>
     )
}
