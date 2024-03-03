# 포켓몬 api with RTK

## Redux Toolkit (RTK)

- `Redux`의 단점을 보완하여 나온 `Redux`팀에서 만든 공식적인 Redox Tool
  - `Redux` 단점
    - 스토어 환경 설정이 너무 복잡하다.
    - 유용하게 사용하기 위해서는 많은 패키지를 추가해줘야한다.
    - 보일러플레이트, 즉 어떤일을 하기위해 꼭 작성해야 하는 상용구코드를 너무 많이 요구한다.

이러한 이슈를 해결하기위해 `RTK`가 등장하게된다. `RTK` 공식 문서는 이렇게 설명한다.

> `Redux Toolkit`은 효율적인 `Redux`개발을 위한 저희의 견해를 반영한, 이것만으로도 작동하는 도구 모음입니다. `Redux Toolkit`은 `Redux`로직을 작성하기 위한 표준 방식이 되도록 만들어졌고, 사용하기를 강력히 추천드립니다.

`Redux` 로직을 작성하는 표준 방식이 되기위한 의도로 만들어 진 `RTK`의 핵심은 기존 **`Redux`의 복잡성을 낮추고 사용성을 높이는 것**이다. `React`가 CRA(Create React App)을 통해 개발 접근성을 높였듯 `RTK`도 복잡한 리덕스 설정과정을 포함해 유스케이스 전반에 걸쳐 추상화를 시도했다. `RTK`에서 제공하는 함수는 사용자에게 애플리케이션 코드를 간단히 작성할 수 있도록 지원하는데 집중한다.

## RTK 주요 API

### configureStore

`Redux` 코어 라이브러리의 표준 함수인 `createStore`를 추상화한 것으로 스토어를 구성하는 함수다. 기존 리덕스의 번거로운 기본 설정 과정을 자동화 한다.

```javascript
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  enhancers: (defaultEnhancers) => [reduxBatch, ...defaultEnhancers],
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```

> reateStore를 감싸서 쓸만한 기본값들과 단순화된 설정을 제공합니다. 여러가지 리듀서 조각들을 자동으로 합쳐주고, 기본 제공되는 redux-thunk를 포함해서 여러분이 지정한 미들웨어들을 더해주고, Redux DevTools 확장을 사용할 수 있게 합니다.

`configureStroe` 함수는 `reducer`, `middleware`, `devTools`, `preloadedState`, `enhancers` 정보를 전달한다.

- `reducer`: 리듀서에는 단일 함수를 전달하여 스토어의 루트 리듀서(root reducer)로 바로 사용한다. 또한 슬라이스 리듀서들로 구성된 객체를 전달하여 루트 리듀서를 생성하도록 할 수 있다. 이런 경우에는 내부적으로 기존 리덕스 combineReducers 함수를 사용해 자동병합하여 루트 리듀서를 생성한다.
- `middleware`: 기본적으로는 리덕스 미들웨어를 담는 배열이다. 사용할 모든 미들웨어를 배열에 담아서 명시적으로 작성할 수도 있으며, 다른 방법으로는 getDefaultMiddleware를 호출한다. 사용자 정의, 커스텀 미들웨어를 추가하면서 동시에 리덕스 기본 미들웨어를 사용할 때 유용하다.
- `devTools`: 불리언값으로 리덕스 개발자 도구를 끄거나 켠다.
- `preloadedState`: 스토어의 초기값을 설정할 수 있다.
- `enhaners`: 기본적으로는 배열이지만 콜백 함수로 정의하기도 한다. 예를 들어 다음과 같이 작성하면 개발자가 원하는 store enhancer를 미들웨어가 적용되는 순서보다 앞서서 추가할 수 있다.

> 리덕스 미들웨어는 dispatch(이하 디스패치)된 액션이 리듀서에 도달하기 전 중간 영역에서 사용자의 목적에 맞게 기능을 확장할 수 있도록 돕는다. 상태의 변형(mutation)을 감지하거나 직렬화, 즉 데이터를 다른 데이터 구조로 맞추어 가공하는 행위가 불가능한 값(non-serializable value)을 사용하는 실수를 방지할 수 있도록 경고해준다. 여기서 직렬화가 불가능하다는 의미는 어떤 데이터를 직렬화 하는 과정에서 데이터를 유실할 수도 있다는 것을 의미한다. <br/><br/>
> 직렬화가 불가능한 값을 액션이나 상태에서 사용하지 않는 것을 권장하고있으며, 직렬화가 불가능한 값들은 Promise, Symbol, Map/Set, function, class instance 등이 있다. 반면에 직렬화가 가능한 값들은 자바스크립트 원시 자료형에 속하는 string, number, null, undefined와 array, object literal(객체 리터럴) 방식으로 선언된 plain object가 있다.

### createSlice

리덕스 로직을 작성하는 표준 접근법은 `createSlice`를 사용하는 것에서 출발한다.

```javascript
const alertSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
```

`action`, `reducer` 함수가 내부적으로 사용되며 `createSlice`에 선언된 슬라이스 이름을 따라서 리듀서와 그리고 그것에 상응하는 액션 생성자와 액션 타입을 **자동으로 생성**한다. 따라서 `createSlice`를 사용하면 따로 `action`, `reducer` 함수를 작성할 필요가 없다.

### createAsyncThunk

액션 타입 문자열과 프로미스를 반환하는 함수를 받아, `pending/fulfilled/rejected` 액션 타입을 디스패치해주는 `thunk`를 생성한다. `createAction`의 비동기 버전을 위해 제안되었으며, 액션 타입 문자열과 프로미스를 반환하는 콜백 함수를 인자로 받아서 주어진 액션 타입을 접두어로 사용하는 프로미스 생명 주기 기반의 액션 타입을 생성한다.

```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
 'users/fetchByIdStatus',
 async (userId: number, thunkAPI) => {
   const response = await userAPI.fetchById(userId)
   return response.data
 }
)

interface UsersState {
 entities: []
 loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
 entities: [],
 loading: 'idle',
} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
 name: 'users',
 initialState,
 reducers: {
   // standard reducer logic, with auto-generated action types per reducer
 },
 extraReducers: (builder) => {
   builder.addCase(fetchUserById.fulfilled, (state, action) => {
     state.entities.push(action.payload)
   })
 },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))
```

---

## Redux Toolkit Query (RTK Query)

- RTK Toolkit패키지에 포함되어있으며, 웹 애플리케이션에서 데이터를 가져오는 상황을 단순화시켜 data fetching과 caching로직을 스스로 작성할 필요가 없도록 한다.

### 주요 서비스

- `createApi()`: RTK 쿼리 기능의 핵심. 해당 데이터를 가져오고 변환하는 방법에 대한 구성을 포함하여 백엔드 API 및 기타 비동기 소스에서 데이터를 검색하는 방법을 설명하는 일련의 "엔드포인트"를 정의할 수 있다. 대부분의 경우 경험상 "기본 URL당 하나의 API 슬라이스"를 사용하여 앱당 한 번만 사용하는걸 권장한다.

```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
```

- store에 서비스 추가

```javascript
import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
```

- 컴포넌트에서 사용

```javascript
const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
```

---

## 폴더구조

```bash
📦pokemon-tanstack
 ┣ 📂public                       // 정적 파일 저장
 ┣ 📂src                          // 소스 코드 저장
 ┃ ┣ 📂assets                     // 이미지, 기타 리소스 관리 폴더
 ┃ ┣ 📂components                 // 컴포넌트 파일 저장 폴더
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜Pokemon.tsx              // 단일 포켓몬 컴포넌트 파일
 ┃ ┃ ┗ 📜PokemonList.tsx          // 포켓몬 리스트 컴포넌트 파일
 ┃ ┣ 📂store                      // 상태관리 파일 저장 폴더 (TanStack-Query 관련)
 ┃ ┃ ┣ 📜query.ts                 // query api 요청관리 파일
 ┃ ┃ ┗ 📜store.ts                 // zustand store 관리 파일
 ┃ ┣ 📂types                      // TypeScript 타입 정의 폴더
 ┃ ┃ ┗ 📜Poke.ts
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.tsx                    // 애플리케이션의 루트 컴포넌트로 애플리케이션의 전반적인 구조너 레이아웃을 정의 (주로 라우팅 설정, Provider제공, 테마설정 등의 역할 수행)
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.tsx                   // 애플리케이션의 진입점 (필요한 환경설정이나 플러그인 로드 및 초기화 관련작업을 수행하여 웹팩이나 Vite같은 번들러나 빌드도구에서 지정하는 진입파일)
 ┃ ┗ 📜vite-env.d.ts              // Vite 환경 설정 파일
 ┣ 📜.eslintrc.cjs                // eslint 설정파일
 ┣ 📜.gitignore                   // Git으로 추적하지 않을 파일이나 폴더를 지정
 ┣ 📜index.html                   // 애플리케이션의 진입점 HTML 파일
 ┣ 📜package-lock.json            // npm 패키지의 의존성 트리 잠금 파일
 ┣ 📜package.json                 // 프로젝트의 메타데이터, 의존성 정보 파일
 ┣ 📜README.md                    // 프로젝트 설명이 담긴 마크다운 파일
 ┣ 📜tsconfig.json                // TypeScript 설정 파일
 ┣ 📜tsconfig.node.json           // Node.js에서 실행되는 TypeScript 설정 파일
 ┗ 📜vite.config.ts               // vite.config.ts: Vite 빌드 도구의 설정 파일
```
