import { Link } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import StarReview from "./StarReview";
import { formatCurrencyVND } from "@/utils";

const CartStyled = styled.div<{ $width: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: ${(props) => props.$width}rem;
  min-height: 43rem;
  padding: 1rem;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  transition: all 0.3s;
  background-color: var(--color-white);
  border-radius: 1rem;
`;

const CarDiscount = styled.div`
  position: absolute;
  top: 0;
  left: -4px;
  text-align: center;
  width: 8rem;
  background: no-repeat
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 100"><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><image width="256" height="100" xlink:href="data:image/png;base64,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"/></g></g></svg>');
  & span {
    display: inline-block;
    font-weight: 600;
    color: var(--color-white);
    padding-bottom: 1rem;
  }
`;

const CardInfo = styled(Link)`
  &:hover {
    & img {
      transition: all 0.5s;
      transform: translateY(-6px);
    }
  }
`;

const CardImg = styled.div`
  width: 100%;
  height: 18rem;
  & img {
    margin: 1rem auto;
    width: 16rem;
    object-fit: contain;
    object-position: center;
  }
`;

const CartContext = styled.div``;

const CardTitle = styled.h5`
  font-weight: 600;
  font-size: 1.4rem;
`;

const CartPrices = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  .price-discount {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-primary);
  }

  .price-old {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-grey-500);
    text-decoration: line-through;
  }
`;

const CartRating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    color: var(--color-text);
    font-size: 1.4rem;
  }
`;

const animationHeart = keyframes`
0%   {scale: 1}
50% {scale: 1.3; }
100% {scale: 1; }
`;

const CardPreOrder = styled.div`
  display: inline-block;
  border-radius: 8px;
  background-color: var(--color-red-100);
  color: var(--color-red-700);
  padding: 2px 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  margin: 8px 0;
`;

const CardEndow = styled.div`
  font-size: 1.2rem;
  color: var(--color-text);
  padding: 6px 6px;
  background-color: #f3f4f6;
  border-radius: 1rem;
  font-weight: 500;
`;
const CardWishlist = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: auto;
  gap: 4px;

  & span {
    color: var(--color-text);
    font-size: 1.2rem;
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-primary);
    cursor: pointer;

    &:hover {
      animation: ${animationHeart} 1s cubic-bezier(0.66, 0, 0, 1) infinite;
    }
  }
`;

interface IProps {
  width: number;
  item: {
    img: string;
    title: string;
    priceDiscount: number;
    priceOld: number;
    rating: number;
    discountValue: number;
  };
}

export default function Cart({ width, item }: IProps) {
  return (
    <CartStyled $width={width}>
      <CardInfo to={"/#"}>
        <CardImg>
          <img src={item.img} alt={item.title} />
        </CardImg>
        <CartContext>
          <CardTitle>{item.title}</CardTitle>
          <CardPreOrder>Pre Order</CardPreOrder>
          <CartPrices>
            <p className="price-discount">
              {formatCurrencyVND(item.priceDiscount)}
            </p>
            <p className="price-old"> {formatCurrencyVND(item.priceOld)}</p>
          </CartPrices>
        </CartContext>
        <CarDiscount>
          <span>-{item.discountValue}%</span>
        </CarDiscount>
      </CardInfo>
      <CartRating>
        <StarReview star={item.rating} size="18px" />
        <span>({item.rating}) Reviews</span>
      </CartRating>
      <CardEndow>
        <p>Phần Mềm Diệt Virus, Office chính hãng chỉ từ 150k </p>
      </CardEndow>
      <div>
        <CardWishlist>
          <span>Yêu thích</span>
          {false ? <AiFillHeart /> : <AiOutlineHeart />}
        </CardWishlist>
      </div>
    </CartStyled>
  );
}
