import React from 'react'
import useSWR from 'swr'
import { ChakraProvider } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, DragHandleIcon, AttachmentIcon} from '@chakra-ui/icons'
import { SimpleGrid, Box, Badge, Image} from "@chakra-ui/react"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const RandomUser = (props) => {
    // {pokemon, name1:bulbasaur}
    const bulbasaur = props.name1
    const {name:pokemonName} = props.pokemon
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName
    // const url = 'https://pokeapi.co/api/v2/pokemon/' + bulbasaur
    const {data, error} = useSWR(url, fetcher)
    if(error) return <div>fail to load</div>
    if(!data) return <div>loading...</div>

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box  p='6'>
                <Badge borderRadius='full' px='4' colorScheme='teal' fontWeight='bold'>
                    <AttachmentIcon/>
                    {data.id}
                </Badge>
            </Box>
            <a href={data.sprites.front_default}>
                <Image src={data.sprites.front_default} alt={pokemonName}></Image>
            </a>
            <a href={url}>
            
            <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
            >
                {pokemonName}
                <DragHandleIcon/>
            </Box>
            
            </a>
            <br/>
            <span className='Card--details'>{data.types.map((poke) => poke.type.name).join(', ')}</span>
        </Box>
    )
}
