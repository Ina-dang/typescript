# React + Zustand + Tanstack Query

## Zustand?

- `Redux`, `Recoil` 등과 함께 전역 상태를 관리할 수 있는 라이브러리.
- `Redux`와 개념적으로 비슷(`Flux`패턴을 채택)하기 때문에 `Redux`, `RTK`사용자가 학습하기 쉽다.
  - `Flux Pattern`?
    - 2014년 facebood F8컨퍼런스에서 발표된 아키텍처로, Client-Side 웹 애플리케이션을 만들기위해 사용하는 디자인 패턴
    - 사용자 입력을 기반으로 `Action`을 만들고 `Action`을 `Dispatcher`에 전달하여 `Store(Model)`의 데이터를 변경 한 뒤 `View`에 반영하는 **단방향 흐름**으로 애플리케이션을 만드는 아키텍처
    - `Flux 구조`란 어느방향으로 데이터가 전달될지 알지 못하는 양방향 데이터흐름인 `MVC패턴`의 복잡성을 해소하기 위해 `Flux패턴`을 통해 **데이터가 단뱡향으로만 변경될 수 있도록 만든 구조**로 데이터 흐름을 일관성 있게 관리해 프로그램의 `예측가능성(Predictability)`을 높일 수 있다.
- `Zustand`의 경우 `action, dispatch, store`개념을 모두 하나의 훅인 `useStore`로 통합하여 사용한다.
  - `React`의 `Context API`를 사용하여 전역상태를 관리하는건 `Redux`와 같지만 `Zustand`는 `create` 함수를 사용하여 각 상태 스토어를 생성시 상태 스토어가 내부적으로 context를 생성한다.
  - 때문에 최상단에서 Provider 함수를 사용하지 않을 수 있다.
- 2024.03.02 Npm trends 기준 `Redux` 다음으로 가장 많이 사용하고있다.
- 1.1kb용량으로 매우 가볍고, provider를 사용하지 않는다.
- 사용중인 필드를 `Selecter`로 추적하기 떄문에 의존성에 대해 명시적으로 구분할 수 있다.
- 모듈의 단위가 RTK Slice와 비슷하여 `Slice` 메서드 관리를 기준으로 스코프 설계를 해야 관리가 편해진다.

```javascript
import create from "zustand";

const useTodosStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

const useSettingsStore = create((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

// useStore로 그룹화하고 사용할 수도 있고 각 컴포넌트에서 명시적으로 직접 각 store를 명시적으로 불러서 사용할 수도 있다.
const useStore = () => {
  const todos = useTodosStore((state) => state.todos);
  const addTodo = useTodosStore((state) => state.addTodo);
  const deleteTodo = useTodosStore((state) => state.deleteTodo);

  const theme = useSettingsStore((state) => state.theme);
  const toggleTheme = useSettingsStore((state) => state.toggleTheme);

  return { todos, addTodo, deleteTodo, theme, toggleTheme };
};

export default useStore;


function App() {
  ...생략
  addTodo(todo);
  ...생략
}
```

---

## TanStack Query?

- v3까지는 우리가 잘 알고있던 `React Query`라는 이름으로 불렸지만 v4부터는 `TanStack Query`이 되었다.

- `TanStack Query`는 이전에는 React 전용 라이브러리였지만 현재는 Solid, Vue, Svelte등에서도 사용이 가능해졌다.

### 라이프 사이클 (useTodosQuery라는 이름으로 예시)

- 상태 종류: `fetching`(데이터 요청상태), `fresh`(데이터가 만료되지 않은 상태), `stale`(데이터가 만료된 상태), `inactive`(사용하지 않는 상태), `delete`(가비지 콜렉터에 의해 캐시에서 제거된 상태)

1. useTodosQuery 쿼리 인스턴스 mount
2. 네트워크에서 데이터를 주고받고 todos 라는 query key로 캐싱
3. 이 때 받은 데이터는 fresh 상태에서 staleTime(기본값 0) 이후 stale 상태로 변경 됨
4. useTodosQuery 쿼리 인스턴스 unmount
5. 캐시가 cacheTime (defaults to 5min or Infinity during SSR)만큼 유지되다가 가비지 콜렉터로 수집
6. 만일 cacheTime이 지나기 전 useTodosQuery 쿼리 인스턴스가 다시 mount 되면 fetch가 실행되고 fresh한 값을 가져오는 동안 캐시데이터를 보여준다

> stale? staleTiem?
>
> > 데이터가 `stale`상태라는건 이전 쿼리 결과가 캐시되어 있지만, 그 결과가 일정시간동안 업데이트되지 않은 상태  
> > `staleTime`은 밀리초단위로 설정되며 기본값은 0  
> > `staleTime`이 0보다 큰 값으로 설정되면, `staleTime`이후에도 이전 캐시 결과를 사용할 수 있어 네트워크 요청을 최소화하고, 사용자 경험 개선이 가능하다.  
> > `staleTime`이 0으로 설정되면, 데즉시 다시 쿼리를 수행하여 업데이트 된 데이터를 가져오기때문에 캐싱 데이터와 무관하게 계속 `fetching`을 수행한다.  
> > `fresh` 상태일때는 페이지 이동에도 `fetch`가 일어나지 않는다. 즉, 데이터가 한 번 `fetch`되고 `staleTime`이 지나지 않았다면 `unmount` 후 `mount`가 발생해도 다시 `fetch`가 발생하지 않는다.  
> > 반대로 `stale` 상태일때는 `backgroun refresh`가 일어나기 위해서는 `trigger`가 필요하다. 이 때 필요한 `trigger`는 윈도우에 다시 포커스가 되거나, 컴포넌트가 다시 마운트 되는경우, 또는 네트워크에 재연결됐을 경우와 같은 `trigger`를 말한다.

> cache? gcTime?
>
> > `v4`까지 `cacheTime` 으로 쓰던 용어를 `v5`에서는 cacheTime → `gcTime`으로 변경됐다.  
> > `gcTime`은 쿼리 결과를 캐시로 저장하는 기간, 비활성 쿼리가 캐시에서 제거될 때 까지의 기간을 말한다.  
> > 기본적으로 `Tanstach Query`는 이전 쿼리 결과를 자동으로 캐싱하고 이후 같은 쿼리가 호출될 때 캐싱된 캐시를 사용한다.
> > 쿼리 인스턴스가 `unmoun`되면 데이터는 `inactive`상태로 변경되며, 캐시는 cacheTiem만큼 유지된다.  
> > `gcTime` 지나면 가비지 콜렉터로 삭제가 된다.

> 유의할 점은 `staleTime`이 `gcTime`보다 길더라도 `gcTime`이 지나면 데이터가 사라지기 때문에 적용할 때 `staleTime`보다 `gcTime`이 더 길어야 한다.  
> 리액트 쿼리의 단점 중 하나가 기본설정의 경우 네트워크 요청 횟수가 많아진다는 점이라 변경이 자주 일어나지 않는 데이터라면 staleTime을 조정하여 불필요한 네트워크 요청 횟수를 줄인다는 사용자가 많았고, 대부분의 사용자는 자주 변경되는 데이터 요청이 많기 때문에 기본설정을 바꾸지 않고 사용하는걸 추천한다는 글이 많았다.

### QueryClient 추가

- `TanStack Query`의 기능을 사용하기 위해 `QueryClient`의 인스턴스를 생성하여 `QueryClientProvider`를 최상단에서 감싸준 후 `QueryClient` 인스턴스를 Client props로 넣어 애플리케이션에 연결한다.

- Devtools는 개발환경의 경우에만 실행하도록 조건을 추가해주었다.

```javascript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

### TanStack Query 주요 Hook

#### 1. useQuery

- `TanStack Query`는 import 한 useQuery Hook을 사용하여 서버에 대한 쿼리를 실행한다.
- useQuery의 인수에는 객체를 이용하며 필수옵션으로는 `queryKey`와 `queryFn`가 있다.
  - queryKey는 유니크한 키로 애플리케이션을 통해 캐시와 쿼리를 공유하는데 사용한다.
    - 쿼리키는 문자열 또는 배열로 저장이 가능하다.
    - 쿼리가 변수에 의존하는 경우에는 queryKey에도 해당 변수를 추가해줘야 한다.
  - queryFn는 Promise를 리턴하는 함수를 설정한다.
- 이 외 기타 옵션들은 [여기]('https://tanstack.com/query/latest/docs/framework/react/reference/useQuery')에서 확인할 수 있다.

```javascript
// useQuery 사용 예시
const useTodosQuery = async () => {
  const { data } = await axios.get("http://localhost:3000/todos");
  return data;
};

/*
 * useQuery를 여러개 만들면 data라는 변수가 여러개 생기게 되어 헷갈릴 수 있으므로
 * ES6의 alias기능을 이용해 data라는 이름을 별칭으로 만드는게 useQuery 사용 관례
 */
const { data: todos } = useQuery({
  queryKey: ["todos"],
  queryFn: useTodosQuery,
});
```

#### 2. useMutation

- 서버 데이터를 업데이트 할 때 쓰이는 Hook
- 데이터를 생성, 수정, 삭제할 때 자주 쓰인다.

```javascript
const deleteTodo = async (id) => {
  const { data } = await axios.delete(`http://localhost:3000/todo/${id}`);
  return data;
};

const { isError, isLoading, mutate, error } = useMutation(
  "deleteTodo",
  deleteTodo
);

// 삭제 버튼을 클릭했을 때 호출되는 함수 (에러핸들링은 아래 참고처럼 전역에서 관리하는걸 만들어두는걸 추천)
const handleDelete = async () => {
  try {
    // deleteTodo 함수를 호출하여 데이터를 삭제합니다.
    const deletedData = await mutate(pokemonId);
    if (isSuccess) {
      console.log("deleted successfully:", deletedData);
    } else if (isError) {
      console.error("isError to delete:", error.message);
    }
  } catch (e) {
    console.error("Failed to delete:", e.message);
  }
};
```

#### 3. useInfiniteQuery

- 파라미터값만 변경해 동일한 useQuery를 무한정 호출할 때 사용
- Infinite Scroll 구현 시 많이 사용
- 반환 값중 자주 쓰이는 옵션
  - fetchNextPage: 다음 페이지 요청 시 사용되는 메서드
  - hasNextPage: 다음 페이지가 있는지 판별하는 boolean 값
  - isFetchingNextPage: 다음 페이지를 불러오는 중인지 판별하는 boolean 값

```javascript
const ROWS_PER_PAGE = 40; // 한 페이지당 불러올 개수
const {
  data: todos,
  error,
  fetchNextPage,
  hasNextPage,
  isError,
  isFetchingNextPage,
  isLoading,
} = useInfiniteQuery(
  "todos",
  ({ pageParam = 1 }) =>
    getTodos({
      startCount: ROWS_PER_PAGE * (pageParam - 1),
      row: ROWS_PER_PAGE,
    }),
  {
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      return lastPage?.data.count === 0 || lastPage?.data.count < rowsPerPage
        ? undefined
        : nextPage;
    },
    retry: 0, // 오류 발생 시 재시도 횟수
    refetchOnMount: false, // 컴포넌트가 마운트 될 때 데이터를 다시 불러올지 여부
    refetchOnReconnect: false, // 오프라인에서 온라인전환시 데이터 다시 불러올지 여부
    refetchOnWindowFocus: false, // 브라우저 창 포커스 시 데이터 다시 불러올지 여부
  }
);
```

## TanStack Query주의사항

- queryChache는 백엔드와 통신하는 데이터에만 사용하는게 좋다.
- 백그라운드에서 다시 가져올 때마다 데이터가 재정의 되기때문에, 로컬 상태는 useState hook 또는 다른 상태관리 툴을 사용하는것을 추천한다.
- 비동기 로직들이 컴포넌트 별로 분산되어있기 때문에, 프로젝트 설계에 신경쓰지 않았을 경우 운영 시 흐름 파악이 오히려 더 어려울 수 있다.

## 참고

- [Zustand]('https://docs.pmnd.rs/zustand/getting-started/introduction')
- [Zustand와 Query같이 사용하기]('https://itchallenger.tistory.com/814')
- [TanStack Query 공식사이트]('https://tanstack.com/query/latest')
- [tkdodo.eu 블로그]('https://tkdodo.eu/blog/practical-react-query')
- [TanStack-query 기본 사용법]('https://mycodings.fly.dev/blog/2024-01-27-how-to-use-tanstack-query-complete-understanding#Frontend')
- [에러핸들링]('https://growing-jiwoo.tistory.com/110')
- [인피니트스크롤]('https://oliveyoung.tech/blog/2023-10-04/useInfiniteQuery-scroll/')

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
