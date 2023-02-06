import { Box } from '@chakra-ui/react';
import React from 'react';

interface WapperProps {
    children: React.ReactElement,
    variant?: "small" | "regular",
}

export const Wapper: React.FC<WapperProps>=({children, variant = "regular"})=>{
    return (
        <Box mt={8} mx="auto" maxW={variant === "regular" ? "800px" : "400px"} w='100%' px="8">
            {children}
        </Box>
    );
}