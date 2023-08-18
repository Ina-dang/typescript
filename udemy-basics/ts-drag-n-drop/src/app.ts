// 네임스페이스 부르기
/// <reference path="components/project-input.ts"/>
/// <reference path="components/project-list.ts"/>
namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
