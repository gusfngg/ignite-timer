import { produce } from 'immer'

import { ActionTypes } from "./actions"

export interface Cycle {
   id: string
   task: string
   minutesAmount: number
   startDate: Date
   interruptDate?: Date
   finishDate?: Date
}

interface CycleState {
   cycles: Cycle[],
   activeCycleId: string | null
}

export function cycleReducer(state: CycleState, action: any) {
   if(action.type === ActionTypes.ADD_NEW_CYCLE) {
      return produce(state, draft => {
         draft.cycles.push(action.playload.newCycle)
         draft.activeCycleId = action.playload.newCycle.id
      })
   }

   if(action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
      const currentCycleIndex = state.cycles.findIndex(cycle => {
         return cycle.id === state.activeCycleId
      })
      
      if(currentCycleIndex < 0) {
         return state;
      }

      return produce(state, draft => {
         draft.activeCycleId = null
         draft.cycles[currentCycleIndex].interruptDate = new Date()
      })  
   }

   if(action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {

      const currentCycleIndex = state.cycles.findIndex((cycle) => {
         return cycle.id === state.activeCycleId
      })
 
       if (currentCycleIndex < 0) {
         return state
      }
 
      return produce(state, (draft) => {
         draft.activeCycleId = null
         draft.cycles[currentCycleIndex].finishDate = new Date()
      })
   }

   return state;
}

export { ActionTypes }
