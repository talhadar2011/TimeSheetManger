import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { Provider } from 'react-redux';
import { store } from '../src/store/store.ts';

const queryClient =new QueryClient({
  defaultOptions:{queries:{retry:5,retryDelay:1000}}
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider  client={queryClient}>
         <App />
          <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Provider>
    
  </StrictMode>,
)
