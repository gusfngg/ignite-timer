import styled from 'styled-components';

export const FormContainer = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;

   color: ${props => props.theme["gray-100"]};
   font-size: 1.125rem;
   font-weight: bold;
   flex-wrap: wrap;
`; 

const BaseInput = styled.input`
   height: 2.5rem;
   border: 0;
   background: transparent;
   border-bottom: 2px solid ${props => props.theme["gray-500"]};

   font-weight: bold;
   font-size: 1.125rem;
   padding: 0 0.5rem;
   color: ${props => props.theme["gray-100"]};

   &:focus {
      box-shadow: none;
      border-color: ${props  => props.theme["green-500"]};
   }

   &::placeholder {
      font-weight: normal;
      color: ${props => props.theme["gray-500"]};
   }

   &:disabled {
      cursor: not-allowed;
      border-bottom: 0;
   }
`;

export const TaskInput = styled(BaseInput)`
   flex: 1;

   border-bottom: 2px solid ${props => props.theme["gray-100"]};

   &::-webkit-calendar-picker-indicator {
      display: none !important;
   }
`;

export const MinutesAmountInput = styled(BaseInput)`
   width: 4rem;
   text-align: center;
`;