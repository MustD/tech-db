import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Routes as RouteNames} from './StaticValues/Routes';
import {Landing} from "./public/landing";
import {ManagementLanding} from "./management/landing";
import {TechTypeCreate, TechTypeEdit, TechTypeList} from "./management/techType";
import {TechTagCreate, TechTagEdit, TechTagList} from "./management/techTag";
import {TagGroupCreate, TagGroupEdit, TagGroupList} from "./management/tagGroup";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing/>}/>
          <Route path={RouteNames.management.index}>
            <Route index element={<ManagementLanding/>}/>

            <Route path={RouteNames.management.techType}>
              <Route index element={<TechTypeList/>}/>
              <Route path={RouteNames.management.techTypeEdit}>
                <Route index element={<TechTypeCreate/>}/>
                <Route path=":techTypeId" element={<TechTypeEdit/>}/>
              </Route>
            </Route>

            <Route path={RouteNames.management.techTag}>
              <Route index element={<TechTagList/>}/>
              <Route path={RouteNames.management.techTagEdit}>
                <Route index element={<TechTagCreate/>}/>
                <Route path=":techTagId" element={<TechTagEdit/>}/>
              </Route>
            </Route>

            <Route path={RouteNames.management.tagGroup}>
              <Route index element={<TagGroupList/>}/>
              <Route path={RouteNames.management.tagGroupEdit}>
                <Route index element={<TagGroupCreate/>}/>
                <Route path=":tagGroupId" element={<TagGroupEdit/>}/>
              </Route>
            </Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
