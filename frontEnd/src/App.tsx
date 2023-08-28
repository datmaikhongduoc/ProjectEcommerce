import { PATH_ADMIN, PATH_USER } from "@/constant";
import { PublicLayOut } from "@/pages/public";
import { Navigate, Route, Routes } from "react-router";
import {
  AdminLayout,
  UserPage,
  OrderPage,
  RatingPage,
  CouponPage,
  PaymentPage,
  SettingPage,
  ProductPage,
  CustomerPage,
  DiscountPage,
  QuestionPage,
  WishlistPage,
  InventoryPage,
  DashboardPage,
} from "@/pages/private";
import { Suspense, lazy } from "react";
import { Spinner } from "./components";

const UserTablePage = lazy(() => import("@/pages/private/user/UserTablePage"));
const UserSearchPage = lazy(
  () => import("@/pages/private/user/UserSearchPage")
);
const UserCreatePage = lazy(
  () => import("@/pages/private/user/UserCreatePage")
);
const CouponTablePage = lazy(
  () => import("@/pages/private/coupon/CouponTablePage")
);
const CouponSearchPage = lazy(
  () => import("@/pages/private/coupon/CouponSearchPage")
);
const CouponCreatePage = lazy(
  () => import("@/pages/private/coupon/CouponCreatePage")
);
const CouponEditPage = lazy(
  () => import("@/pages/private/coupon/CouponEditPage")
);

const DiscountTablePage = lazy(
  () => import("@/pages/private/discount/DiscountTablePage")
);
const DiscountEditPage = lazy(
  () => import("@/pages/private/discount/DiscountEditPage")
);
const DiscountCreatePage = lazy(
  () => import("@/pages/private/discount/DiscountCreatePage")
);
const DiscountAddProductsPage = lazy(
  () => import("@/pages/private/discount/DiscountAddProductsPage")
);

const BrandPage = lazy(() => import("@/pages/private/brand/BrandPage"));
const BrandTablePage = lazy(
  () => import("@/pages/private/brand/BrandTablePage")
);

const ProductTablePage = lazy(
  () => import("@/pages/private/product/ProductTablePage")
);
const ProductCreatePage = lazy(
  () => import("@/pages/private/product/ProductCreatePage")
);
const ProductProvidePage = lazy(
  () => import("@/pages/private/product/ProductProvidePage")
);
const ProductUpdateBasicPage = lazy(
  () => import("@/pages/private/product/ProductUpdateBasicPage")
);
const ProductUpdateMainInfoPage = lazy(
  () => import("@/pages/private/product/ProductUpdateMainInfoPage")
);
const ProductUpdateMainInfoDetail = lazy(
  () => import("@/pages/private/product/ProductUpdateMainInfoDetail")
);

const DemandPage = lazy(() => import("@/pages/private/demand/DemandPage"));
const DemandTablePage = lazy(
  () => import("@/pages/private/demand/DemandTablePage")
);
const DemandCreatePage = lazy(
  () => import("@/pages/private/demand/DemandCreatePage")
);
const DemandUpdatePage = lazy(
  () => import("@/pages/private/demand/DemandUpdatePage")
);

const ProductCategoryPage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryPage")
);
const ProductCategoryTablePage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryTablePage")
);

const ProductCategoryCreatePage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryCreatePage")
);
const ProductCategoryUpdatePage = lazy(
  () => import("@/pages/private/productCategory/ProductCategoryUpdatePage")
);

const ProductCategoryGroupPage = lazy(
  () => import("@/pages/private/productCategoryGroup/ProductCategoryGroupPage")
);
const ProductCategoryGroupTablePage = lazy(
  () =>
    import("@/pages/private/productCategoryGroup/ProductCategoryGroupTablePage")
);
const ProductCategoryGroupCreatePage = lazy(
  () =>
    import(
      "@/pages/private/productCategoryGroup/ProductCategoryGroupCreatePage"
    )
);
const ProductCategoryGroupUpdatePage = lazy(
  () =>
    import(
      "@/pages/private/productCategoryGroup/ProductCategoryGroupUpdatePage"
    )
);

const OrderTablePage = lazy(
  () => import("@/pages/private/order/OrderTablePage")
);

const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const HomePage = lazy(() => import("@/pages/public/home/Homepage"));
const ProductCategoryPageUser = lazy(
  () => import("@/pages/public/product/product-category/ProductCategoryPage")
);

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Layout of public */}
        <Route element={<Navigate replace to={"/"} />} />
        <Route path={"/"} element={<PublicLayOut />}>
          <Route path={PATH_USER.home} element={<HomePage />} />
          <Route
            path={PATH_USER.product}
            element={<ProductCategoryPageUser />}
          />
        </Route>

        {/* <Route element={<Navigate replace to={"/admin"} />} /> */}
        {/* Layout of private */}
        <Route path={PATH_ADMIN.admin} element={<AdminLayout />}>
          <Route path={PATH_ADMIN.brand} element={<BrandPage />}>
            <Route path="" element={<BrandTablePage />} />
          </Route>

          <Route
            path={PATH_ADMIN.productCategoryGroup}
            element={<ProductCategoryGroupPage />}
          >
            <Route path="" element={<ProductCategoryGroupTablePage />} />
            <Route
              path={"create"}
              element={<ProductCategoryGroupCreatePage />}
            />
            <Route
              path={"update/:productCategoryGroupId"}
              element={<ProductCategoryGroupUpdatePage />}
            />
          </Route>

          <Route
            path={PATH_ADMIN.productCategory}
            element={<ProductCategoryPage />}
          >
            <Route path="" element={<ProductCategoryTablePage />} />
            <Route path={"create"} element={<ProductCategoryCreatePage />} />
            <Route
              path={"update/:productCategoryId"}
              element={<ProductCategoryUpdatePage />}
            />
          </Route>

          <Route path={PATH_ADMIN.demand} element={<DemandPage />}>
            <Route path="" element={<DemandTablePage />} />
            <Route path={"create"} element={<DemandCreatePage />} />
            <Route path={"update/:demandId"} element={<DemandUpdatePage />} />
          </Route>

          <Route path={PATH_ADMIN.user} element={<UserPage />}>
            <Route path="" element={<UserTablePage />} />
            <Route path={`search`} element={<UserSearchPage />} />
            <Route path={`createEmployees`} element={<UserCreatePage />} />
          </Route>

          <Route path={PATH_ADMIN.order} element={<OrderPage />}>
            <Route path={""} element={<OrderTablePage />} />
          </Route>

          <Route path={PATH_ADMIN.coupon} element={<CouponPage />}>
            <Route path="" element={<CouponTablePage />} />
            <Route path={`search`} element={<CouponSearchPage />} />
            <Route path={`create`} element={<CouponCreatePage />} />
            <Route path={`update/:couponId`} element={<CouponEditPage />} />
          </Route>

          <Route path={PATH_ADMIN.discount} element={<DiscountPage />}>
            <Route path={``} element={<DiscountTablePage />} />
            <Route path={`create`} element={<DiscountCreatePage />} />
            <Route path={`update/:discountId`} element={<DiscountEditPage />} />
            <Route
              path={`addProduct/:discountId`}
              element={<DiscountAddProductsPage />}
            />
          </Route>

          <Route path={PATH_ADMIN.rating} element={<RatingPage />} />
          <Route path={PATH_ADMIN.setting} element={<SettingPage />} />
          <Route path={PATH_ADMIN.payment} element={<PaymentPage />} />

          <Route path={PATH_ADMIN.product} element={<ProductPage />}>
            <Route path={``} element={<ProductTablePage />} />
            <Route path={`create`} element={<ProductCreatePage />} />
            <Route
              path={`provideInfo/:productId`}
              element={<ProductProvidePage />}
            />
            <Route
              path={`updateBasic/:productId`}
              element={<ProductUpdateBasicPage />}
            />
            <Route
              path={`updateMainInfo/:productId`}
              element={<ProductUpdateMainInfoPage />}
            />
            <Route
              path={`updateMainInfoDetail/:productId`}
              element={<ProductUpdateMainInfoDetail />}
            />
          </Route>

          <Route path={PATH_ADMIN.customer} element={<CustomerPage />} />
          <Route path={PATH_ADMIN.question} element={<QuestionPage />} />
          <Route path={PATH_ADMIN.wishlist} element={<WishlistPage />} />

          <Route path={PATH_ADMIN.dashboard} element={<DashboardPage />} />
          <Route path={PATH_ADMIN.inventory} element={<InventoryPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
