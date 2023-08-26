import { useEffect } from "react"
import {
    OuterContainer, Container, CardContainer,
    CardBody, ImageContainer,
    DetailContainer, Title, PriceContainer, Discount, DetailBody, Rating, Price
} from "./HomeStyle"
import { AiOutlineStar } from "react-icons/ai"
import { BiRupee } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { saveProductDetailAction } from "../../store/action/productAction"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const HomeComponent = () => {
    const productSelector = useSelector((state) => state.products)
    console.log("productSelector=====>", productSelector)
    const dispatch = useDispatch()
    const router = useRouter()
    // const[storeId, set]
    useEffect(() => {
        const fun = async () => {
            const response = await fetch("http://localhost:4000/product/all", {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
            const result = await response.json()
            console.log("product result=====<>>>>>>>", result.response)
            dispatch(saveProductDetailAction(result.response))
        }
        fun()
    }, [])
    const detailHandler = (id) => {
        // console.log("product is<<<<<<<<<<<<<<<<>>>>>>>>", id)
        router.push(`/productdetail/${id}`)
        // router.push("/productdetail")

    }
    return (
        <>
            <OuterContainer>
                <Container>
                    <CardContainer >
                        {
                            productSelector.productDetails.map((e) => {
                                return <CardBody key={e._id} onClick={detailHandler.bind(this, e._id)}>
                                    <ImageContainer>
                                        <img src={e.images[0]} alt="" />
                                    </ImageContainer>
                                    <DetailContainer>
                                        <DetailBody>
                                            <Title>{e.title}</Title>
                                            <Discount> 10%</Discount>
                                        </DetailBody>
                                        <DetailBody>
                                            <PriceContainer>
                                                <BiRupee />
                                                <Price>{e.price}</Price>
                                            </PriceContainer>
                                            <Rating>
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                                <AiOutlineStar />
                                            </Rating>
                                        </DetailBody>
                                    </DetailContainer>
                                </CardBody>
                            })
                        }
                    </CardContainer>
                </Container>
            </OuterContainer>
        </>
    )
}
export default HomeComponent