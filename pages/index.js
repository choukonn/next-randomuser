import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { RandomUser } from '../components/RandomUser'
import { ChakraProvider } from '@chakra-ui/react' 
import { Heading, SimpleGrid, Box, Badge, Image, Divider} from "@chakra-ui/react"
import useSWR from 'swr'

const API = 'https://randomuser.me/api/?results=20';
const fetcher = (...args) => fetch(...args).then((res)=>res.json())

export default function Home() {
  const {data: result, error} = useSWR(API, fetcher);
  if (error) {
    return <div>fail to load!</div>
  }
  if (!result) {
    return <div>loading...</div>
  }
  return (
    <ChakraProvider>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <Heading>RandomUserShow</Heading>
        <Divider orientation='horizontal'/>
        <SimpleGrid
        bg='gray.50'
        columns={{ sm: 2, md: 4 }}
        spacing='8'
        p='10'
        textAlign='center'
        rounded='lg'
        color='gray.400'>
        {
          result.results.map((re)=>(
            // この中の引数は全部（key,value）対として扱い、objectとしてhook functionに渡す
            /*
             {  
               key: re.phone,
               userInfo: re
             }
             この感じでhook funに引数を渡す
             「注意：」'key'はreact用、開発者に関係ない（ユーニックで更新判断）
             */
            <Box boxShadow='xs' p='6' rounded='md' bg='white' maxW='sm'>
              <RandomUser key={ re.phone } userInfo={ re }></RandomUser>
            </Box>
          ))
        }
        </SimpleGrid>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
    </ChakraProvider>
  )
}
