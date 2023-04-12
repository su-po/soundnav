import Image from 'next/image'
import { Inter } from 'next/font/google'
import data from '../../db/data.json'


type Station = {
  website_title: string,
  website_description: string,
  website_url: string,
  website_image: string,
  website_feed?: string
}

type Stations = Station[]

const inter = Inter({ subsets: ['latin'] })

export default function Home({ stations }: { stations: Stations }) {
  console.log(stations)
  const p = 'https://wsrv.nl/?url='

  const nofeed = 'No Feed'
  return (
    <main className='p-8 container mx-auto'>
      <h1 className='text-5xl mb-8'>SoundNav</h1>


      <ul className='flex gap-12 md:gap-8 flex-wrap flex-col md:flex-row md:justify-between '>
        {
          stations && stations.map((station, index) => (
            <li key={index}>

              <section className='transition-all hover:shadow-2xl md:w-96 md:min-w-[20rem] h-full p-4 border border-black flex flex-col md:justify-between mb-2 '>
                <div className=''>
                  <div className="flex justify-between mb-3 items-center gap-3 border-b-2 pb-2 border-black">

                    <h2 className='text-lg font-bold'>{station.website_title}</h2>
                    {station.website_image.length > 0 && (
                      <Image className='max-w-[32px] overflow-hidden object-contain rounded-lg' src={`${p + station.website_image}`} alt='icon' width={32} height={32} />
                    )
                    }
                  </div>
                  <p className='text-base text-gray-600 mb-2'>{station.website_description}</p>

                </div>
                <div className='flex justify-between items-center '>
                  <a className='hover:bg-black border border-black hover:text-white p-2 bg-white text-black' target="_blank" rel="noopener noreferrer" href={`${station.website_url}`}>Source</a>

                  {station.website_feed && station.website_feed.length > 0 ? (

                    <a target="_blank" rel="noopener noreferrer" className='hover:bg-black border border-black hover:text-white p-2 bg-white text-black' href={`${station.website_feed}`}>Feed Available</a>
                    // if user right clicks to download, it will download the feed and name it after the website title

                  ) : (
                    <p className='text-red-400 p-2 uppercase '>{nofeed}</p>
                  )}

                </div>
              </section>

            </li>
          ))
        }
      </ul>

    </main >
  )
}


export async function getStaticProps() {

  return {
    props: { stations: data }, // will be passed to the page component as props
  }
}