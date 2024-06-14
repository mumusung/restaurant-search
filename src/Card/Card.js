import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';
const CardContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    justifyContent: 'center',
    padding: '15px 20px',
    marginTop: '30px',
    marginLeft: '100px',
});

const CardWrapper = styled('div')({
    flexBasis: 'calc(33.33% - 80px)',
    marginBottom: '16px',
    marginRight: '40px',
    borderRadius: '20px',
    '@media (max-width: 900px)': {
        flexBasis: 'calc(50% - 16px)',
    },
    '@media (max-width: 600px)': {
        flexBasis: '100%',
    },
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPagination-ul': {
        justifyContent: 'center',
    },
    '& .MuiPaginationItem-root': {
        display: 'none',
    },
    '& .MuiPaginationItem-outlined': {
        display: 'inline-flex',
        margin: '0 2px',
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                backgroundColor: theme.palette.primary.dark,
            },
        },
    },
    '& .MuiPaginationItem-ellipsis': {
        display: 'none',
    },
    '& .MuiPaginationItem-page': {
        display: 'inline-flex',
    },
    '& .MuiPaginationItem-previous, & .MuiPaginationItem-next': {
        display: 'inline-flex',
    },
}));

const getDayName = (dayIndex) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
}

export default function RestaurantCard({ data }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 9;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getCurrentDayOfWeek = () => {
        const today = new Date().getDay();
        return today;
    };

    const filteredData = data.filter(item => {
        const currentDayOfWeek = getCurrentDayOfWeek();
        return item.operation_time.some(time => time.day === getDayName(currentDayOfWeek));
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name)).slice(startIndex, endIndex);

    return (
        <CardContainer>
            {sortedData.map((item, index) => (
                <CardWrapper key={index}>
                    <Link
                        key={index}
                        to={`/restaurant/${item.id}`}
                        style={{textDecoration:'none'}}
                        >
                        <Card sx={{ maxWidth: 'auto' }}>
                            <CardHeader
                                avatar={
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 60, height: 60, borderRadius: '15px' }}
                                        image={item.profile_image_url}
                                        alt={item.name}
                                    />
                                }
                                title={
                                    <Typography variant="h6" component="div">
                                        {item.name}
                                    </Typography>
                                }
                                subheader={
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <Typography variant="body2" color="text.secondary" fontWeight={700}>
                                            {item.operation_time.find(time => time.day === getDayName(getCurrentDayOfWeek())).time_open} - {item.operation_time.find(time => time.day === getDayName(getCurrentDayOfWeek())).time_close}
                                        </Typography>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '4px', color: '#000', fontSize: '30px', color: '#134B8A' }}>•</span>
                                            <Typography variant="body2" color="#134B8A" fontSize={15} >
                                                {item.rating}
                                            </Typography>
                                        </div>
                                    </div>
                                }
                            />
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '20px 30px', borderRadius: '15px' }}>
                                {item.images.map((url, index) => (
                                    <div key={index} style={{ width: '100%', height: '160px', overflow: 'hidden', marginBottom: '8px', }}>
                                        <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover', }} alt={item.name} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Link>
                </CardWrapper>
            ))}
            <StyledPagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                page={currentPage}
                onChange={(event, page) => handlePageChange(page)}
                variant="outlined"
                shape="rounded"
                style={{ marginTop: '20px', alignSelf: 'center' }}
                renderItem={(item) => {
                    if (item.type === 'previous' || item.type === 'next' || item.page === currentPage) {
                        return <PaginationItem {...item} />;
                    }
                    return null;
                }}
            />
        </CardContainer>
    );
}
