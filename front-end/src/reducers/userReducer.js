import M from 'materialize-css'
export const initialstate = null

export const reducer = (state,action)=>{
    if(action.type == "USER"){
       return action.payload
    }
    else if(action.type == "CLEAR"){
        M.toast({html:'Logged out successfully', colors:'square #d32f2f red darken-2'})
        return null
    }
    return state
}