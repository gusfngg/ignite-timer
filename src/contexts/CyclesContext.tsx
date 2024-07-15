import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { Cycle } from '../reducers/cycles/reducer';
import { cycleReducer } from "../reducers/cycles/reducer";

import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns";

interface CreateNewCycleData {
   task: string;
   minutesAmount: number;
}

interface CycleContextType {
   cycles: Cycle[]
   activeCycle: Cycle | undefined
   activeCycleId: string | null
   amountSecondsPassed: number
   markCurrentCycleAsFinished: () => void
   setSecondsPassed: (seconds: number) => void
   createNewCycle: (data: CreateNewCycleData) => void
   interruptCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)


interface CyclesContextProviderProps {
   children: ReactNode
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {

   const [cyclesState, dispatch] = useReducer(cycleReducer, 
      {
         cycles: [],
         activeCycleId: null,
      }, (initialState) => {
         const storageStateAsJSON = localStorage.getItem('@ignite-timer:cycle-state-1.0.0');

         if(storageStateAsJSON) {
            return JSON.parse(storageStateAsJSON)
         }

         return  initialState;
      })

   const { cycles, activeCycleId } = cyclesState;
   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);


   const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
      if(activeCycle) {
         return differenceInSeconds(new Date(),new Date(activeCycle.startDate))
      }

      return 0
   });

   useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState);

      localStorage.setItem('@ignite-timer:cycle-state-1.0.0', stateJSON)
   }, [cyclesState])

   function markCurrentCycleAsFinished() {
      dispatch(markCurrentCycleAsFinishedAction)
   }

   function setSecondsPassed(seconds: number) {
      setAmountSecondsPassed(seconds)
   }

   function createNewCycle(data: CreateNewCycleData) {
      const id = String(new Date().getTime());
      const newCycle: Cycle = {
         id,
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date(),
      }


      dispatch(addNewCycleAction(newCycle))
      setAmountSecondsPassed(0)
   }

   function interruptCycle() {
      dispatch(interruptCurrentCycleAction())
   }

   return (
      <CyclesContext.Provider
       value={{
         activeCycle,
         activeCycleId,
         markCurrentCycleAsFinished,
         amountSecondsPassed,
         setSecondsPassed,
         createNewCycle,
         interruptCycle,
         cycles
       }}
       >
      
      {children}
      </CyclesContext.Provider>
   )
}