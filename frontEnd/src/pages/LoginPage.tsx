import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IUserCreate } from "@/interfaces/user.interface";
import {
  Button,
  Heading,
  InputAuth,
  LoginRegisterLabel,
  LogoAuth,
} from "@/components";
import { Link } from "react-router-dom";
import { PATH_USER } from "@/constant";

const LoginPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 6rem;
`;

const ContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const ImgLogo = styled.img`
  width: 150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleForget = styled(Link)`
  align-self: flex-end;
  bottom: 1.5rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: var(--color-primary);
  font-style: italic;
  margin-bottom: 1rem;
`;

const RegisterNow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  & p {
    color: var(--color-grey-500);
    color: var(--color-text);
  }

  & a {
    color: var(--color-primary);
    font-weight: 600;
  }
`;

const SeePromotion = styled(Link)`
  text-decoration: underline;
  color: var(--color-primary);
  margin-top: 1rem;
  font-weight: 600;

  &:hover {
    font-style: italic;
  }
`;

const LoginPage: React.FC = () => {
  const { handleSubmit, register, formState, watch } = useForm<IUserCreate>();
  const onSubmit = (dataForm) => {
    console.log();
  };
  return (
    <LoginPageStyled>
      <ContainerTop>
        <Header>
          <Heading $as="h3">Đăng nhập Smember</Heading>
        </Header>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="logoLogin"
        />
      </ContainerTop>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputAuth
          id="userName"
          type="text"
          register={register("user_email")}
          label="Nhập số điện thoại/email"
          hasValue={!!watch("user_email")}
        />
        <InputAuth
          id="password"
          type="password"
          register={register("user_password")}
          label="Nhập mật khẩu"
          hasValue={!!watch("user_password")}
        />
        <TitleForget to={`/${PATH_USER.forgotPassword}`}>
          Quên mật khẩu?
        </TitleForget>
        <Button $width="100%">Đăng Nhập</Button>
        <LoginRegisterLabel>
          <p>Hoặc đăng ký bằng</p>
        </LoginRegisterLabel>
      </Form>
      <LogoAuth />
      <RegisterNow>
        <p>Bạn chưa có tài khoản?</p>
        <Link to={`/${PATH_USER.register}`}>Đăng ký ngay</Link>
      </RegisterNow>
      <SeePromotion to={"#"}> Xem chính sách ưu đãi Smember </SeePromotion>
    </LoginPageStyled>
  );
};

export default LoginPage;
