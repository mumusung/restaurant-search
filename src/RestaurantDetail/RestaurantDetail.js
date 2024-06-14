import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './RestaurantDetail.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/example_data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        const restaurantData = json.find(item => item.id.toString() === id);
        setRestaurant(restaurantData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }
  console.log(restaurant.operation_time[0].day)
  return (
    <div>
      <Button variant="contained" sx={{ borderRadius: '40px', marginLeft: '10vw', marginTop: '2vh', marginBottom: '2vw' }}>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>&lt; Back</Link>
      </Button>
      <div className='detail-background'>
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',gap:'2rem' }}>
          <Card sx={{ height: '100%', width: '35vw', display: 'flex', flexDirection: 'column', borderRadius: '16px' }}>
            <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="300"
                image={restaurant.profile_image_url}
                alt="image"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {restaurant.name}
                </Typography>
                <div style={{ display: 'flex' }}>
                  <Typography variant="body2" color="text.secondary">
                    ADDRESS: {restaurant.address}
                  </Typography>
                </div>
                <div style={{ display: 'flex' }}>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      OPENING HOUR:
                    </Typography>
                  </div>
                  <div>
                    {restaurant.operation_time.map((item, index) => (
                      <Typography key={index} variant="body2" color="text.secondary" marginLeft={2}>
                        {`${item.day}: ${item.time_open} AM - ${item.time_close} PM`}
                      </Typography>
                    ))}
                  </div></div>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card sx={{ height: '100%', maxWidth: '35vw', display: 'flex', flexDirection: 'column', borderRadius: '16px'  }}>
            <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column',alignItems:'baseline',width:'35vw' }}>
            <h1 style={{ paddingLeft:'25px' }}>Images</h1>
            {restaurant.images.map((img, index) => (<CardMedia
              key={index}
                component="img"
                height="25%"
                image={img}
                alt="image"
              />))}
            </CardActionArea>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
