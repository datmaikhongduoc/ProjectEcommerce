/* eslint-disable react/prop-types */
import styled from "styled-components";
import React, { Children, ReactNode, createContext, useContext } from "react";

const StyledTable = styled.div`
  font-size: 1.4rem;
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-white);
`;

const CommonRow = styled.div<{ $columns?: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  /* & div:first-child {
    transform: translateX(20px);
  } */
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TableContextType = {
  columns: string;
};

interface IProps {
  children: ReactNode;
  columns: string;
  data: any;
  render: any;
}

const TableContext = createContext({} as TableContextType);

const Table = (props: Pick<IProps, "children" | "columns">) => {
  return (
    <TableContext.Provider value={{ columns: props.columns }}>
      <StyledTable role="table">{props.children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header = (props: Pick<IProps, "children">) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns}>
      {props.children}
    </StyledHeader>
  );
};

function Body(props: Pick<IProps, "data" | "render">) {
  if (!props?.data?.length) return <Empty>No data to show at the moment</Empty>;
  // props.render = (brand: BrandType) => <BrandRow brand={brand} />
  return <StyledBody>{props.data.map(props.render)}</StyledBody>;
}

function Row(props: Pick<IProps, "children">) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {props.children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
