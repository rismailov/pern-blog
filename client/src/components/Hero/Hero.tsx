import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { Box } from '@mantine/core'
import { Header } from './Header'
import classes from './Hero.module.css'
import { Slide } from './Slide/Slide'

export const Hero = () => {
    return (
        <Box p="0.4rem">
            <Box className={classes.heroInner}>
                <Box className={classes.headerWrapper}>
                    <Header />
                </Box>

                <Carousel
                    withIndicators
                    h="600px"
                    withControls={false}
                    classNames={{
                        indicators: classes.carouselIndicators,
                    }}
                >
                    <Slide />
                </Carousel>
            </Box>
        </Box>
    )
}
