import { useEffect, useRef } from 'react'

let script = document.createElement('script')
script.src = '/lib/flickity/flickity.pkgd.min.js'
document.body.appendChild(script)


let link = document.createElement('link')
link.rel = 'stylesheet'
link.href = '/lib/flickity/flickity.css'
document.body.appendChild(link)


const style: { [key in string]: React.CSSProperties } = {
    thumbnail: {
        display: 'flex'
    },
    thumbnail_wrap: {
        width: '20%'
    },
    thumbnail_img: {
        maxWidth: '100%'
    }
}

declare global {
    interface Window {
        Flickity: any;
    }
}


export default function Carousel(props: any) {
    useEffect(() => {
        function init() {
            console.log('init', window.Flickity)
            if (window.Flickity) {
                new window.Flickity(ref.current, {
                    wrapAround: true,
                    prevNextButtons: false,
                    pageDots: false,
                    lazyLoad: 2,
                    imagesLoaded: true
                })
            } else {
                setTimeout(init, 100)
            }
        }
        init();

    }, [])
    let ref: any = useRef(null)

    function select() {
        console.log(ref.current);
    }
    return (
        <>
            <div
                className="carousel-detail"
                ref={ref}
                style={{ height: 400 }}
            >
                {
                    props.images?.map((e: any, i: number) => <div key={i} style={{ height: 400 }}><img src={e.large_url} style={{ objectFit: 'contain' }} alt="" /></div>)
                }
            </div>
            <div className="thumbnail" style={style.thumbnail}>
                {
                    props.images?.filter((e: any, i: number) => i <= 5)?.map((e: any, i: number) => <div onClick={select} key={i} style={style.thumbnail}><img style={style.thumbnail_img} src={e.large_url} alt="" /></div>)
                }
            </div>
        </>
    )
}
