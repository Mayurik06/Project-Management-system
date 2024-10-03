import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CustomIcons({currentPage,totalPages,onPageChange}) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIosIcon, next: ArrowForwardIosIcon }}
            {...item}
            sx={{
           color:'#3F3F3F' ,
              '&.Mui-selected': {
                backgroundColor: '#0CC9E8', 
                color: 'white',          // Text color for the selected page
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
