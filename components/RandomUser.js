import React from 'react'
import useSWR from 'swr'
import { ChakraProvider } from '@chakra-ui/react'
import { PhoneIcon, EmailIcon,AtSignIcon, AttachmentIcon, StarIcon} from '@chakra-ui/icons'
import { SimpleGrid, Box, Badge, Image, IconButton} from "@chakra-ui/react"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const RandomUser = (props) => {
    // each search results of userinfo
    const {gender, name, location, email, dob, registered, phone, cell, picture} = props.userInfo;

    const full_name = name.title + " " + name.first + " "  + name.last;

    const address_arr = ["〒" + location.postcode, location.country, location.state, location.city, location.street.name, location.street.number];
    const address_str = address_arr.map((ad)=>ad).join(" ");

    const age = dob.age;
    const birthday = dob.date.slice(0, 10);

    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box  p='6'>
                <Badge borderRadius='full' px='4' colorScheme='teal' fontWeight='bold'>
                    <AttachmentIcon/>
                    {full_name}
                </Badge>
            </Box>
            <Box alignItems='center'>
                <a href={picture.large}>
                <Image 
                src={picture.large} 
                alt={full_name}
                borderRadius="full"
                align='center'
                />
                </a>
            </Box>
            <Box mt='2' alignItems='center'>
                {
                    Array(5).fill('')
                    .map((_, i) => (
                        <StarIcon 
                            key={i}
                            color={i < age%5 ? 'teal.500' : 'gray.300'}
                        />))
                }
            </Box>
            <Box
            mt='1'
            fontWeight='semibold'
            lineHeight='tight'
            textTransform='uppercase'
            isTruncated
            >
                {gender} &bull; {age} &bull; {birthday}
            </Box>
            <Box>
                <IconButton
                    icon={<PhoneIcon color='teal.300'/>}
                />
                {phone}
            </Box>
            <Box>
                <EmailIcon color='red.300'/> &nbsp;
                {email}
            </Box>
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                {address_arr.map((ad) => ad).join(' ')}
            </Box>
        </Box>
    )
}
