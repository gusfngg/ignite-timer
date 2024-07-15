import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from "@phosphor-icons/react";
import { FormProvider, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { Countdown } from "./components/Coutdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { CyclesContext } from "../../contexts/CyclesContext";

import { 
   HomeContainer,
   StartCountdownButton,
   StopCountdownButton,
} from './styles';

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Informe a tarefa!'),
   minutesAmount: zod
   .number()
   .min(1, 'O ciclo precisa ser no minímo 5 minutos.')
   .max(60, 'O clico preicsa ser no máximo 60 minutos.'),
});

export function Home() {
   const { createNewCycle, interruptCycle, activeCycle } = useContext(CyclesContext);

   const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0
      }
   });

   const { handleSubmit, watch, reset } = newCycleForm; 

   function handleCreateNewCycle(data: NewCycleFormData) {
      createNewCycle(data);

      reset();
   }
   
   const task = watch('task');
   const minutesAmountWatch = watch('minutesAmount');

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
               <FormProvider {...newCycleForm}>
                  <NewCycleForm/>
               </FormProvider>
               <Countdown/>

            { activeCycle ? (
               <StopCountdownButton onClick={interruptCycle} type="button">
                  <HandPalm size={24} />
                  Interromper
               </StopCountdownButton>
            ) : (
               <StartCountdownButton disabled={!task || !minutesAmountWatch} type="submit">
                  <Play size={24} />
                  Começar
               </StartCountdownButton>
            ) }
         </form>
      </HomeContainer>
   )
}