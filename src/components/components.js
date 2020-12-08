const { default: styled } = require("styled-components");

const TableHeader = styled.div`
  background-color: #eb6913;
  border-radius: 5px;
  padding: 4px 8px;
  width: 100%;
`;

const TableBody = styled.div`
  min-height: 300px;
  padding: 8px;
`;

const TextInput = styled.input`
    background: white !important;
    border: 2px solid #7FC7AF !important;
    border-radius: 6px !important;
    padding-left: 2% !important;
    width: 98% !important ;
`;

const FormButton = styled.button`
  background: #eb6913;
  border-radius: 9px;
  color: #fff;
  border: 1px solid #eb6913;
  padding: 10px 30px;
`;

export { TableHeader, TableBody, TextInput, FormButton };
