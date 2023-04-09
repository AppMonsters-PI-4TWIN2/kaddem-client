import { createContext, useReducer } from 'react'

export const ProjectsContext = createContext()

export const ProjectsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                projects: action.payload
            }
        case 'CREATE_PROJECT':
            return {
                projects: [action.payload, ...state.projects]
            }
        case 'DELETE_PROJECT':
            return {
                projects: state.projects.filter(p => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ProjectsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProjectsReducer, {
        projects: null
    })

    return (
        <ProjectsContextProvider value={{ ...state, dispatch }}>
            { children }
        </ProjectsContextProvider>
    )
}