import Link from "next/link";
import { Button } from "../button";

import { Navbar } from "../navbar";
import h_l_b_r from "@/app/assets/h_l_b_r.svg";
import h_r_l from "@/app/assets/h_r_l.png";
import hero_ssg1 from "@/app/assets/hero_ssg1.svg";
import hero_ssg2 from "@/app/assets/hero_ssg2.svg";
import Image from "next/image";
export interface HeroSectionProps {
  className?: string;
}
export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(289deg, #58126A -40.56%, #F6B2E1 119.32%)`,
      }}
      className={`${className} relative`}
    >
      <svg
        className="absolute top-0 right-0"
        width="347"
        height="303"
        viewBox="0 0 347 303"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="247"
          cy="56"
          r="228"
          stroke="#E6B0D9"
          strokeOpacity="0.1"
          strokeWidth="37"
        />
      </svg>
      <svg
        className="absolute left-0 top-[25%]"
        width="204"
        height="117"
        viewBox="0 0 204 117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-64.9998 116C-64.9998 102.674 -65.7262 91.8912 -58.7775 79.8889C-44.0597 54.4672 -26.6358 35.1258 -1.11087 20.1112C30.7216 1.38619 78.6417 -5.79309 113.445 8.4445C139.139 18.9559 160.608 31.9851 181 50.1112C191.29 59.258 196.042 69.563 203 80.0001"
          stroke="white"
          strokeOpacity="0.64"
          strokeLinecap="round"
          strokeDasharray="8 8"
        />
      </svg>
      <Image
        src={hero_ssg2}
        className="absolute  left-1/2 -translate-x-[1/2] top-[200px] -translate-y-3/4"
        alt=""
      />
      <Image src={hero_ssg1} className="absolute bottom-20 left-9" alt="" />

      <Navbar className="z-10" />
      <div className={`responsive z-10 py-[195px]`}>
        <div className="flex justify-center lg:justify-between items-center gap-20 text-center relative">
          <div className="w-[200px] hidden h-[150px] lg:flex p-8 shrink-0 justify-center items-center relative bg-white/50 rounded-md">
            <svg
              className="absolute -top-10 -left-10"
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M39.707 10.707L46.2179 30.7455L67.2877 30.7455L50.2419 43.13L56.7528 63.1685L39.707 50.784L22.6613 63.1685L29.1722 43.13L12.1264 30.7455L33.1961 30.7455L39.707 10.707Z"
                fill="white"
              />
              <path
                d="M54.4289 14.7215L49.8662 35.2913L68.0192 45.9871L47.0463 48.0041L42.4835 68.5739L34.0842 49.2507L13.1113 51.2677L28.8932 37.3083L20.4939 17.9851L38.647 28.6809L54.4289 14.7215Z"
                fill="white"
              />
            </svg>
            <span className="absolute font-bold text-3xl text-[rgba(88,18,106,0.30)] top-0 right-0 p-1">
              02
            </span>
            <Image
              className="absolute -bottom-5 -right-5"
              src={h_l_b_r}
              alt=""
            />
            <span className="text-white font-medium">
              Choose your best tools
            </span>
          </div>
          <div className="flex flex-col items-center  max-w-[570px] gap-3">
            <h1 className="uppercase text-primary font-semibold">
              Empowering Innovation
            </h1>
            <h2 className="text-white font-semibold text-5xl break-words">
              Powerful Solutions For The Enterprise
            </h2>
            <p className="text-black/70 break-words">
              Are you ready to take your projects to new heights? At Xtreme
              Tool, we're dedicated to empowering innovation and unleashing your
              potential.
            </p>
            <div className="flex items-center justify-center gap-5">
              <Link href="/signup">
                <Button className="bg-primary border-transparent border">
                  Get Started
                </Button>
              </Link>
              {/* <Button className="border">Pricing plans</Button> */}
            </div>
          </div>
          <div className="w-[200px] h-[150px] shrink-0  relative bg-white/50 rounded-md  hidden lg:flex justify-center items-center p-9 text-white">
            <span className="absolute font-bold text-3xl text-[rgba(88,18,106,0.30)] bottom-0 right-0 p-1">
              01
            </span>
            <svg
              className="absolute -top-10 -right-10"
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
            >
              <path
                d="M39.707 10.707L46.2179 30.7455L67.2877 30.7455L50.2419 43.13L56.7528 63.1685L39.707 50.784L22.6613 63.1685L29.1722 43.13L12.1264 30.7455L33.1961 30.7455L39.707 10.707Z"
                fill="white"
              />
              <path
                d="M54.4289 14.7215L49.8662 35.2913L68.0192 45.9871L47.0463 48.0041L42.4835 68.5739L34.0842 49.2507L13.1113 51.2677L28.8932 37.3083L20.4939 17.9851L38.647 28.6809L54.4289 14.7215Z"
                fill="white"
              />
            </svg>
            <svg
              className="absolute scale-125 -top-[275px]  xl:scale-100 xl:-top-[250px] xl:-left-2"
              width="155"
              height="241"
              viewBox="0 0 155 241"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M124.935 1.36768C125.138 1.18054 125.151 0.864222 124.964 0.661159C124.777 0.458097 124.461 0.445186 124.258 0.632322L124.935 1.36768ZM105.248 26.1768L104.83 25.9031L105.248 26.1768ZM85.2388 68.6589L84.7659 68.4966L85.2388 68.6589ZM77.1269 104.591L77.6256 104.628L77.1269 104.591ZM87.7925 135.176L88.1951 134.88L87.7925 135.176ZM116.545 152.962L116.413 153.445L116.545 152.962ZM143.885 151.64L144.096 152.093L143.885 151.64ZM153.979 128.627L153.48 128.613L153.979 128.627ZM147.55 103.059L147.149 103.358L147.55 103.059ZM120.631 109.579L120.988 109.929L120.631 109.579ZM108.102 125.893L108.542 126.131L108.102 125.893ZM95.8143 156.868L95.3511 156.68L95.8143 156.868ZM74.4831 188.745L74.1148 188.406L74.4831 188.745ZM32.7821 224.226L32.5357 223.791L32.7821 224.226ZM8.68685 233.78L8.82258 234.262L8.68685 233.78ZM5.2464 235.054C5.52093 235.024 5.7193 234.777 5.68947 234.503C5.65965 234.228 5.41292 234.03 5.13839 234.059L5.2464 235.054ZM7.40823 233.614C7.14109 233.684 6.98123 233.957 7.05117 234.224C7.12111 234.491 7.39437 234.651 7.66151 234.581L7.40823 233.614ZM11.9494 233.35C12.2138 233.27 12.3633 232.991 12.2835 232.726C12.2037 232.462 11.9247 232.313 11.6603 232.392L11.9494 233.35ZM17.8128 230.384C17.5524 230.476 17.4161 230.762 17.5082 231.022C17.6003 231.282 17.886 231.419 18.1463 231.327L17.8128 230.384ZM24.2319 228.972C24.4861 228.864 24.605 228.571 24.4973 228.317C24.3897 228.062 24.0962 227.943 23.842 228.051L24.2319 228.972ZM29.695 225.323C29.4493 225.449 29.3523 225.75 29.4783 225.996C29.6044 226.241 29.9057 226.338 30.1514 226.212L29.695 225.323ZM36.9866 222.313C37.2212 222.167 37.2933 221.859 37.1477 221.624C37.002 221.39 36.6938 221.318 36.4592 221.463L36.9866 222.313ZM44.0232 216.36C43.8001 216.522 43.7511 216.835 43.9138 217.058C44.0764 217.281 44.3892 217.331 44.6123 217.168L44.0232 216.36ZM51.8596 211.509C52.0718 211.332 52.1007 211.017 51.924 210.805C51.7474 210.592 51.4321 210.564 51.2199 210.74L51.8596 211.509ZM58.0798 204.705C57.8771 204.893 57.865 205.209 58.0526 205.412C58.2402 205.614 58.5566 205.626 58.7592 205.439L58.0798 204.705ZM65.3622 199.055C65.5569 198.859 65.556 198.543 65.3603 198.348C65.1645 198.153 64.8479 198.154 64.6532 198.35L65.3622 199.055ZM71.0024 191.762C70.8135 191.964 70.8237 192.28 71.0252 192.469C71.2266 192.658 71.543 192.648 71.7319 192.446L71.0024 191.762ZM78.0766 185.482C78.258 185.274 78.2364 184.958 78.0283 184.776C77.8201 184.595 77.5043 184.617 77.3228 184.825L78.0766 185.482ZM83.3932 177.38C83.2267 177.601 83.2704 177.914 83.4907 178.081C83.711 178.247 84.0246 178.204 84.1911 177.983L83.3932 177.38ZM89.6768 170.001C89.822 169.766 89.7494 169.458 89.5145 169.313C89.2796 169.168 88.9715 169.24 88.8263 169.475L89.6768 170.001ZM93.4187 161.065C93.3001 161.314 93.4061 161.612 93.6555 161.731C93.9049 161.85 94.2032 161.744 94.3218 161.494L93.4187 161.065ZM97.7946 153.158C97.8915 152.899 97.7603 152.611 97.5017 152.515C97.2431 152.418 96.9549 152.549 96.8581 152.807L97.7946 153.158ZM99.6702 144.968C99.5785 145.229 99.7154 145.514 99.9758 145.606C100.236 145.698 100.522 145.561 100.613 145.3L99.6702 144.968ZM103.453 137.475C103.552 137.217 103.423 136.928 103.165 136.829C102.907 136.731 102.618 136.86 102.519 137.118L103.453 137.475ZM105.772 129.401C105.654 129.651 105.762 129.949 106.011 130.067C106.261 130.184 106.559 130.077 106.677 129.828L105.772 129.401ZM111.202 121.771C111.356 121.542 111.296 121.231 111.067 121.077C110.838 120.923 110.527 120.983 110.373 121.212L111.202 121.771ZM116.746 113.028C116.564 113.235 116.584 113.551 116.791 113.733C116.999 113.916 117.315 113.896 117.497 113.688L116.746 113.028ZM123.824 107.294C124.034 107.115 124.059 106.799 123.88 106.589C123.701 106.379 123.385 106.354 123.175 106.533L123.824 107.294ZM129.619 101.92C129.38 102.059 129.299 102.365 129.438 102.604C129.577 102.842 129.883 102.923 130.122 102.784L129.619 101.92ZM137.205 99.8953C137.475 99.8398 137.649 99.5755 137.594 99.305C137.538 99.0345 137.274 98.8602 137.004 98.9157L137.205 99.8953ZM144.951 99.9779C144.714 99.8353 144.407 99.9114 144.264 100.148C144.122 100.384 144.198 100.692 144.434 100.834L144.951 99.9779ZM148.904 106.124C149.036 106.367 149.339 106.457 149.582 106.325C149.825 106.193 149.915 105.89 149.783 105.647L148.904 106.124ZM152.359 111.931C152.278 111.666 151.999 111.517 151.735 111.597C151.471 111.678 151.321 111.957 151.402 112.221L152.359 111.931ZM152.853 118.685C152.895 118.958 153.15 119.145 153.423 119.103C153.696 119.061 153.883 118.806 153.841 118.533L152.853 118.685ZM154.468 125.261C154.459 124.985 154.227 124.769 153.951 124.778C153.675 124.787 153.459 125.019 153.468 125.295L154.468 125.261ZM153.345 131.925C153.329 132.2 153.54 132.437 153.815 132.453C154.091 132.468 154.327 132.258 154.343 131.982L153.345 131.925ZM153.563 138.66C153.617 138.389 153.44 138.126 153.169 138.072C152.899 138.019 152.636 138.195 152.582 138.466L153.563 138.66ZM150.52 144.624C150.392 144.868 150.487 145.17 150.732 145.298C150.976 145.426 151.278 145.332 151.406 145.087L150.52 144.624ZM147.038 150.326C147.257 150.159 147.3 149.845 147.133 149.626C146.966 149.406 146.652 149.363 146.433 149.53L147.038 150.326ZM140.482 152.487C140.221 152.577 140.083 152.862 140.174 153.123C140.265 153.384 140.55 153.522 140.81 153.431L140.482 152.487ZM133.91 155.046C134.184 155.012 134.378 154.761 134.343 154.487C134.309 154.214 134.058 154.02 133.785 154.054L133.91 155.046ZM126.896 154.255C126.62 154.238 126.383 154.448 126.366 154.724C126.349 154.999 126.559 155.236 126.834 155.253L126.896 154.255ZM119.84 154.277C120.11 154.334 120.375 154.161 120.432 153.891C120.49 153.621 120.317 153.356 120.047 153.299L119.84 154.277ZM112.565 151.259C112.302 151.174 112.02 151.318 111.935 151.581C111.85 151.843 111.994 152.125 112.257 152.21L112.565 151.259ZM104.174 149.037C104.423 149.155 104.722 149.049 104.84 148.8C104.959 148.55 104.853 148.252 104.603 148.134L104.174 149.037ZM97.2486 143.826C97.0244 143.665 96.712 143.716 96.5507 143.94C96.3895 144.165 96.4406 144.477 96.6648 144.638L97.2486 143.826ZM90.1547 138.848C90.3406 139.052 90.6568 139.067 90.861 138.881C91.0652 138.695 91.0801 138.379 90.8942 138.175L90.1547 138.848ZM85.8706 131.506C85.7212 131.274 85.4118 131.206 85.1796 131.356C84.9473 131.505 84.8802 131.815 85.0295 132.047L85.8706 131.506ZM80.9953 124.77C81.1124 125.02 81.4101 125.128 81.6601 125.011C81.9102 124.894 82.018 124.596 81.9009 124.346L80.9953 124.77ZM79.0203 116.701C78.945 116.435 78.6686 116.281 78.4029 116.356C78.1372 116.431 77.9828 116.708 78.0581 116.973L79.0203 116.701ZM76.6118 108.749C76.6288 109.024 76.866 109.234 77.1416 109.217C77.4172 109.2 77.6269 108.963 77.61 108.687L76.6118 108.749ZM78.0623 100.054C78.0946 99.7794 77.8986 99.5308 77.6243 99.4985C77.3501 99.4661 77.1015 99.6622 77.0692 99.9364L78.0623 100.054ZM78.5363 90.7801C78.482 91.0508 78.6575 91.3143 78.9282 91.3686C79.199 91.4229 79.4625 91.2474 79.5168 90.9766L78.5363 90.7801ZM81.6305 82.0215C81.7023 81.7548 81.5444 81.4805 81.2777 81.4087C81.0111 81.3369 80.7367 81.4948 80.6649 81.7615L81.6305 82.0215ZM83.303 72.8862C83.2182 73.149 83.3625 73.4308 83.6253 73.5156C83.8881 73.6004 84.1699 73.4561 84.2547 73.1933L83.303 72.8862ZM87.0086 65.1259C87.1019 64.866 86.9668 64.5796 86.7069 64.4863C86.447 64.3931 86.1607 64.5281 86.0674 64.788L87.0086 65.1259ZM88.8372 57.4298C88.7357 57.6867 88.8617 57.9771 89.1185 58.0786C89.3753 58.18 89.6658 58.0541 89.7673 57.7972L88.8372 57.4298ZM92.7727 50.569C92.8835 50.3161 92.7682 50.0212 92.5152 49.9105C92.2623 49.7997 91.9674 49.915 91.8567 50.168L92.7727 50.569ZM95.1575 43.027C95.0364 43.2752 95.1394 43.5746 95.3875 43.6957C95.6357 43.8168 95.935 43.7139 96.0562 43.4657L95.1575 43.027ZM99.6471 36.5157C99.7797 36.2735 99.6907 35.9696 99.4484 35.8371C99.2062 35.7046 98.9023 35.7936 98.7698 36.0359L99.6471 36.5157ZM102.72 29.2275C102.576 29.4626 102.649 29.7706 102.884 29.9154C103.119 30.0602 103.427 29.9869 103.572 29.7517L102.72 29.2275ZM107.844 23.1202C107.995 22.8893 107.931 22.5793 107.7 22.4279C107.469 22.2765 107.159 22.3409 107.008 22.5719L107.844 23.1202ZM111.45 15.952C111.293 16.1788 111.349 16.4904 111.576 16.6479C111.803 16.8054 112.114 16.7492 112.272 16.5224L111.45 15.952ZM116.966 10.1328C117.137 9.91564 117.099 9.60132 116.882 9.43073C116.665 9.26015 116.35 9.29789 116.18 9.51505L116.966 10.1328ZM121.4 3.44708C121.209 3.64691 121.217 3.9634 121.417 4.15399C121.616 4.34457 121.933 4.33708 122.123 4.13725L121.4 3.44708ZM4 235.122C4.43112 235.122 4.84408 235.097 5.2464 235.054L5.13839 234.059C4.76992 234.099 4.39306 234.122 4 234.122V235.122ZM7.66151 234.581C8.04193 234.481 8.42768 234.373 8.82258 234.262L8.55112 233.299C8.15562 233.411 7.77835 233.517 7.40823 233.614L7.66151 234.581ZM8.82258 234.262C9.86793 233.967 10.9105 233.663 11.9494 233.35L11.6603 232.392C10.6278 232.704 9.59113 233.006 8.55112 233.299L8.82258 234.262ZM18.1463 231.327C20.197 230.601 22.2275 229.821 24.2319 228.972L23.842 228.051C21.8582 228.891 19.8466 229.664 17.8128 230.384L18.1463 231.327ZM30.1514 226.212C31.1186 225.716 32.0779 225.2 33.0284 224.662L32.5357 223.791C31.5975 224.323 30.6504 224.832 29.695 225.323L30.1514 226.212ZM33.0284 224.662C34.3686 223.903 35.6875 223.119 36.9866 222.313L36.4592 221.463C35.1712 222.263 33.8639 223.039 32.5357 223.791L33.0284 224.662ZM44.6123 217.168C47.0944 215.358 49.5063 213.468 51.8596 211.509L51.2199 210.74C48.8816 212.686 46.4866 214.564 44.0232 216.36L44.6123 217.168ZM58.7592 205.439C61.0033 203.361 63.2005 201.228 65.3622 199.055L64.6532 198.35C62.4997 200.515 60.3124 202.638 58.0798 204.705L58.7592 205.439ZM71.7319 192.446C72.7772 191.332 73.8165 190.21 74.8514 189.083L74.1148 188.406C73.082 189.531 72.045 190.65 71.0024 191.762L71.7319 192.446ZM74.8514 189.083C75.9486 187.888 77.0243 186.689 78.0766 185.482L77.3228 184.825C76.2768 186.024 75.2069 187.217 74.1148 188.406L74.8514 189.083ZM84.1911 177.983C86.1413 175.402 87.9756 172.753 89.6768 170.001L88.8263 169.475C87.1432 172.197 85.3268 174.821 83.3932 177.38L84.1911 177.983ZM94.3218 161.494C95.0096 160.048 95.6621 158.57 96.2775 157.056L95.3511 156.68C94.7431 158.175 94.0983 159.636 93.4187 161.065L94.3218 161.494ZM96.2775 157.056C96.8018 155.766 97.3051 154.466 97.7946 153.158L96.8581 152.807C96.3711 154.108 95.8712 155.4 95.3511 156.68L96.2775 157.056ZM100.613 145.3C101.537 142.677 102.464 140.06 103.453 137.475L102.519 137.118C101.524 139.717 100.594 142.345 99.6702 144.968L100.613 145.3ZM106.677 129.828C107.266 128.577 107.885 127.344 108.542 126.131L107.663 125.655C106.996 126.886 106.368 128.136 105.772 129.401L106.677 129.828ZM108.542 126.131C109.324 124.687 110.221 123.225 111.202 121.771L110.373 121.212C109.377 122.688 108.462 124.178 107.663 125.655L108.542 126.131ZM117.497 113.688C118.657 112.369 119.832 111.108 120.988 109.929L120.273 109.229C119.105 110.421 117.918 111.695 116.746 113.028L117.497 113.688ZM120.988 109.929C121.786 109.114 122.745 108.214 123.824 107.294L123.175 106.533C122.074 107.471 121.093 108.392 120.273 109.229L120.988 109.929ZM130.122 102.784C132.429 101.441 134.856 100.377 137.205 99.8953L137.004 98.9157C134.513 99.4265 131.983 100.543 129.619 101.92L130.122 102.784ZM144.434 100.834C145.408 101.422 146.322 102.246 147.149 103.358L147.951 102.761C147.054 101.554 146.045 100.638 144.951 99.9779L144.434 100.834ZM147.149 103.358C147.787 104.216 148.371 105.143 148.904 106.124L149.783 105.647C149.23 104.629 148.621 103.662 147.951 102.761L147.149 103.358ZM151.402 112.221C152.039 114.319 152.516 116.504 152.853 118.685L153.841 118.533C153.498 116.311 153.011 114.079 152.359 111.931L151.402 112.221ZM153.468 125.295C153.507 126.437 153.51 127.548 153.48 128.613L154.479 128.641C154.51 127.555 154.507 126.423 154.468 125.261L153.468 125.295ZM153.48 128.613C153.449 129.71 153.408 130.818 153.345 131.925L154.343 131.982C154.407 130.862 154.448 129.744 154.479 128.641L153.48 128.613ZM152.582 138.466C152.147 140.669 151.498 142.754 150.52 144.624L151.406 145.087C152.441 143.109 153.115 140.927 153.563 138.66L152.582 138.466ZM146.433 149.53C145.616 150.151 144.7 150.707 143.673 151.187L144.096 152.093C145.186 151.583 146.163 150.991 147.038 150.326L146.433 149.53ZM143.673 151.187C142.612 151.684 141.548 152.115 140.482 152.487L140.81 153.431C141.909 153.049 143.004 152.604 144.096 152.093L143.673 151.187ZM133.785 154.054C131.503 154.343 129.207 154.398 126.896 154.255L126.834 155.253C129.202 155.4 131.561 155.344 133.91 155.046L133.785 154.054ZM120.047 153.299C118.927 153.061 117.803 152.787 116.676 152.48L116.413 153.445C117.557 153.757 118.699 154.035 119.84 154.277L120.047 153.299ZM116.676 152.48C115.281 152.099 113.91 151.694 112.565 151.259L112.257 152.21C113.619 152.651 115.005 153.061 116.413 153.445L116.676 152.48ZM104.603 148.134C102.012 146.902 99.5537 145.484 97.2486 143.826L96.6648 144.638C99.0242 146.335 101.535 147.783 104.174 149.037L104.603 148.134ZM90.8942 138.175C89.956 137.144 89.0556 136.047 88.1951 134.88L87.39 135.473C88.2709 136.668 89.1932 137.791 90.1547 138.848L90.8942 138.175ZM88.1951 134.88C87.3998 133.8 86.6215 132.673 85.8706 131.506L85.0295 132.047C85.7921 133.232 86.5824 134.377 87.39 135.473L88.1951 134.88ZM81.9009 124.346C80.7419 121.871 79.7578 119.305 79.0203 116.701L78.0581 116.973C78.8121 119.636 79.8162 122.252 80.9953 124.77L81.9009 124.346ZM77.61 108.687C77.5263 107.327 77.5283 105.971 77.6256 104.628L76.6283 104.555C76.5275 105.946 76.5256 107.347 76.6118 108.749L77.61 108.687ZM77.6256 104.628C77.7367 103.095 77.8832 101.571 78.0623 100.054L77.0692 99.9364C76.8884 101.468 76.7404 103.007 76.6283 104.555L77.6256 104.628ZM79.5168 90.9766C80.1195 87.9704 80.8318 84.9874 81.6305 82.0215L80.6649 81.7615C79.8613 84.7458 79.1438 87.75 78.5363 90.7801L79.5168 90.9766ZM84.2547 73.1933C84.7257 71.7334 85.2123 70.2764 85.7117 68.8213L84.7659 68.4966C84.2647 69.9569 83.7761 71.4199 83.303 72.8862L84.2547 73.1933ZM85.7117 68.8213C86.1355 67.5865 86.5676 66.3546 87.0086 65.1259L86.0674 64.788C85.6247 66.0213 85.1911 67.2577 84.7659 68.4966L85.7117 68.8213ZM89.7673 57.7972C90.7265 55.369 91.7266 52.9582 92.7727 50.569L91.8567 50.168C90.8054 52.569 89.8006 54.9911 88.8372 57.4298L89.7673 57.7972ZM96.0562 43.4657C97.2004 41.1217 98.3957 38.8037 99.6471 36.5157L98.7698 36.0359C97.5106 38.3381 96.3082 40.6699 95.1575 43.027L96.0562 43.4657ZM103.572 29.7517C104.255 28.6426 104.953 27.542 105.667 26.4505L104.83 25.9031C104.111 27.0025 103.408 28.1108 102.72 29.2275L103.572 29.7517ZM105.667 26.4505C106.386 25.3503 107.11 24.2391 107.844 23.1202L107.008 22.5719C106.274 23.6912 105.548 24.805 104.83 25.9031L105.667 26.4505ZM112.272 16.5224C113.781 14.3494 115.34 12.2035 116.966 10.1328L116.18 9.51505C114.538 11.6052 112.967 13.7677 111.45 15.952L112.272 16.5224ZM122.123 4.13725C123.038 3.17887 123.974 2.25353 124.935 1.36768L124.258 0.632322C123.279 1.53399 122.327 2.47453 121.4 3.44708L122.123 4.13725Z"
                fill="white"
                fillOpacity="0.64"
              />
              <path
                d="M8.03994 238.601C7.97836 238.623 7.91274 238.633 7.8473 238.628C7.78186 238.624 7.71806 238.606 7.65998 238.576L1.91997 235.828C1.66486 235.705 1.5618 235.413 1.68394 235.158L4.43541 229.427C4.55755 229.172 4.84992 229.069 5.10503 229.191C5.36014 229.313 5.46319 229.606 5.34106 229.861L2.80333 235.145L8.0969 237.679C8.35201 237.802 8.45506 238.094 8.33293 238.349C8.27186 238.477 8.16587 238.567 8.0527 238.607L8.03994 238.601Z"
                fill="white"
                fillOpacity="0.64"
              />
            </svg>
            <Image
              className="absolute -left-1/2 translate-x-[15%] aspect-auto w-auto -top-4 h-[105%] "
              src={h_r_l}
              alt=""
            />
            Get to know our work
          </div>
        </div>
      </div>
    </section>
  );
}
