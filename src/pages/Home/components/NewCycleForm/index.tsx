import { FormContainer, TaskInput, MinutesAmountInput } from './styles';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useContext } from 'react';

export function NewCycleForm() {
   const { activeCycle } = useContext(CyclesContext)
   const { register } = useFormContext();

   return (
      <FormContainer>
            <label htmlFor="">Vou trabalhar em</label>
            <TaskInput 
               id="task"
               list="task-sugestions"
               placeholder="De um nome para seu projeto!"
               disabled={!!activeCycle}
               {...register('task')}
            />

            <label htmlFor="minutesAmount">durante</label>
            <MinutesAmountInput 
               type="number" 
               id="minutesAmount"
               placeholder="00"
               disabled={!!activeCycle}
               step={5}
               min={1}
               max={60}
               {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
      </FormContainer>
   )  
}