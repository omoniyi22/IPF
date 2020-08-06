
const { default: styled } = require("styled-components");

const TableHeader = styled.div`
    background-color: #EB6913;
    border-radius: 5px;
    padding: 4px 8px;
    width:100%;
`

const TableBody = styled.div`
    min-height: 300px;
    padding: 8px;
    
`

const TextInput = styled.input`
    background: rgba(196, 196, 196, 0.32) !important;
    border: 2px solid rgba(196, 196, 196, 0.32);!important;
    border-radius: 6px !important;
    padding-left: 16px !important;
`

const FormButton = styled.button`
    background: #EB6913;
    border-radius: 9px;
    color: #fff;
    border: 1px solid #EB6913;
    padding: 10px 30px;
`

export {
    TableHeader,
    TableBody, 
    TextInput,
    FormButton
}