namespace App {
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  // Project State Management with Singleton
  export class ProjectState extends State<Project> {
    //subscription patteren
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {
      super();
    } //다른 객체들이 싱글턴과 new 연산자를 동시에 사용할 수 없도록 기본 생성자를 private설정
    static getInstatnce() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
      }
    }
    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }
  //state express
  // const projectState = new ProjectState(); //항상 새로운 인스턴스 객체 생성
  export const projectState = ProjectState.getInstatnce(); //싱글턴을 사용해 전체(전역접근을 사용)에서 하나의 인스턴스 객체만을 제공한다.
}
