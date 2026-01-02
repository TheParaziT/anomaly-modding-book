import React from "react";
import type { ComponentProps } from "react";

// Импортируем SVG-иконки как React-компоненты
// Предполагается, что вы разместили SVG-файлы в static/img/icons
import WikipediaIcon from "@site/static/img/logo/wikipedia.svg";
import DefaultExternalIcon from "@site/static/img/logo/external.svg";
import GitHubIcon from "@site/static/img/logo/github.svg";
import BlenderIcon from "@site/static/img/logo/blender.svg";
import DiscordIcon from "@site/static/img/logo/discord.svg";
import FFMPEGIcon from "@site/static/img/logo/ffmpeg.svg";
import YandexDiskIcon from "@site/static/img/logo/yandex-disk.svg";
import GoogleDriveIcon from "@site/static/img/logo/google-drive.svg";
import BitbucketIcon from "@site/static/img/logo/bitbucket.svg";
import MegaIcon from "@site/static/img/logo/mega.svg";
import NotepadPlusPlusIcon from "@site/static/img/logo/notepad-plus-plus.svg";
import NexusModsIcon from "@site/static/img/logo/nexus-mods.svg";
import AudacityIcon from "@site/static/img/logo/audacity.svg";
import VisualStudioCodeIcon from "@site/static/img/logo/visual-studio-code.svg";
import VSCodiumIcon from "@site/static/img/logo/vscodium.svg";
import SketchfabIcon from "@site/static/img/logo/sketchfab.svg";
import YouTubeIcon from "@site/static/img/logo/youtube.svg";
import LuaIcon from "@site/static/img/logo/lua.svg";
import StackEditIcon from "@site/static/img/logo/stackedit.svg";
import GitIcon from "@site/static/img/logo/git.svg";
import NodeJSIcon from "@site/static/img/logo/nodejs.svg";
import DocusaurusIcon from "@site/static/img/logo/docusaurus.svg";
import BandcampIcon from "@site/static/img/logo/bandcamp.svg";
import GitLabIcon from "@site/static/img/logo/gitlab.svg";
import WaybackMachineIcon from "@site/static/img/logo/wayback-machine.svg";
import OpenGLIcon from "@site/static/img/logo/opengl.svg";
import MicrosoftLearnIcon from "@site/static/img/logo/microsoft.svg";
import NVidiaIcon from "@site/static/img/logo/nvidia.svg";
import AMBIcon from "@site/static/img/logo/book.svg";
import GimpIcon from "@site/static/img/logo/gimp.svg";
import AdobePhotoshopIcon from "@site/static/img/logo/adobe-photoshop.svg";

// Функция для определения типа ссылки
const getIconInfo = (
  href: string
): { Icon: React.ComponentType | null; alt: string } => {
  try {
    const url = new URL(href);
    const hostname = url.hostname;

    // Правила для разных ресурсов
    if (hostname.includes("wikipedia.org")) {
      return { Icon: WikipediaIcon, alt: "Wikipedia" };
    }
    if (hostname.includes("github.com")) {
      return { Icon: GitHubIcon, alt: "GitHub" };
    }
    if (hostname.includes("blender.org")) {
      return { Icon: BlenderIcon, alt: "Blender" };
    }
    if (hostname.includes("discord")) {
      return { Icon: DiscordIcon, alt: "Discord" };
    }
    if (hostname.includes("ffmpeg.org")) {
      return { Icon: FFMPEGIcon, alt: "FFmpeg" };
    }
    if (hostname.includes("disk.yandex.ru")) {
      return { Icon: YandexDiskIcon, alt: "Yandex Disk" };
    }
    if (hostname.includes("drive.google.com")) {
      return { Icon: GoogleDriveIcon, alt: "Google Drive" };
    }
    if (hostname.includes("bitbucket.org")) {
      return { Icon: BitbucketIcon, alt: "Bitbucket" };
    }
    if (hostname.includes("mega.nz")) {
      return { Icon: MegaIcon, alt: "Mega" };
    }
    if (hostname.includes("notepad-plus-plus.org")) {
      return { Icon: NotepadPlusPlusIcon, alt: "Notepad++" };
    }
    if (hostname.includes("nexusmods.com")) {
      return { Icon: NexusModsIcon, alt: "Nexus Mods" };
    }
    if (hostname.includes("audacityteam.org")) {
      return { Icon: AudacityIcon, alt: "Audacity" };
    }
    if (hostname.includes("code.visualstudio.com")) {
      return { Icon: VisualStudioCodeIcon, alt: "Visual Studio" };
    }
    if (hostname.includes("vscodium.com")) {
      return { Icon: VSCodiumIcon, alt: "VS Codium" };
    }
    if (hostname.includes("sketchfab.com")) {
      return { Icon: SketchfabIcon, alt: "Sketchfab" };
    }
    if (hostname.includes("youtube.com")) {
      return { Icon: YouTubeIcon, alt: "YouTube" };
    }
    if (hostname.includes("youtu.be")) {
      return { Icon: YouTubeIcon, alt: "YouTube" };
    }
    if (hostname.includes("lua.org")) {
      return { Icon: LuaIcon, alt: "Lua" };
    }
    if (hostname.includes("stackedit.io")) {
      return { Icon: StackEditIcon, alt: "StackEdit" };
    }
    if (hostname.includes("gitforwindows.org")) {
      return { Icon: GitIcon, alt: "Git" };
    }
    if (hostname.includes("nodejs.org")) {
      return { Icon: NodeJSIcon, alt: "Node.js" };
    }
    if (hostname.includes("docusaurus.io")) {
      return { Icon: DocusaurusIcon, alt: "Docusaurus" };
    }
    if (hostname.includes("bandcamp")) {
      return { Icon: BandcampIcon, alt: "Bandcamp" };
    }
    if (hostname.includes("gitlab")) {
      return { Icon: GitLabIcon, alt: "GitLab" };
    }
    if (hostname.includes("web.archive.org")) {
      return { Icon: WaybackMachineIcon, alt: "Wayback Machine" };
    }
    if (hostname.includes("khronos.org")) {
      return { Icon: OpenGLIcon, alt: "OpenGL Wiki" };
    }
    if (hostname.includes("learn.microsoft.com")) {
      return { Icon: MicrosoftLearnIcon, alt: "Microsoft Learn" };
    }
    if (hostname.includes("nvidia.com")) {
      return { Icon: NVidiaIcon, alt: "NVidia" };
    }
    if (hostname.includes("marketplace.visualstudio.com")) {
      return { Icon: MicrosoftLearnIcon, alt: "Microsoft Marketplace" };
    }
    if (hostname.includes("gimp.org")) {
      return { Icon: GimpIcon, alt: "Gimp" };
    }
    if (hostname.includes("adobe.com")) {
      return { Icon: AdobePhotoshopIcon, alt: "Adobe Photoshop" };
    }

    // Для всех остальных внешних ссылок — общая иконка
    return { Icon: DefaultExternalIcon, alt: "External link" };
  } catch {
    // Если href не является абсолютным URL, считаем ссылку внутренней
    return { Icon: AMBIcon, alt: "Anomaly Modding Book" };
  }
};

// Props компонента соответствуют стандартным props элемента <a>
interface CustomLinkProps extends ComponentProps<"a"> {
  // Дополнительные props, если нужны
}

export default function CustomLink(props: CustomLinkProps) {
  const { href, children, ...rest } = props;
  const { Icon, alt } = getIconInfo(href || "");

  return (
    <a href={href} {...rest}>
      {children}
      {Icon && (
        <>
          {" "}
          <Icon
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              width: "1em",
              height: "1em",
            }}
            aria-label={alt}
            title={alt}
          />
        </>
      )}
    </a>
  );
}
