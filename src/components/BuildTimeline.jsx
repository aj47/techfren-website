import { useId, useRef, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FiGithub, FiArrowUpRight, FiMaximize2, FiPlay } from 'react-icons/fi';
import { projectLink } from '../timeline';
import { portfolioTimeline } from '../portfolio';
import '../pages/Timeline.css';

function Screenshot({ project }) {
  const clipId = useId();
  const [x, y, width, height] = project.crop;
  return (
    <svg viewBox={project.crop.join(' ')} role="img" aria-label={`${project.name} screenshot`} className={`build-screenshot build-screenshot--${project.id}`}>
      <defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
      <image href="/timeline-assets/build-timeline-reference.png" width="1506" height="730" clipPath={`url(#${clipId})`} />
    </svg>
  );
}

export default function BuildTimeline({ groups = portfolioTimeline }) {
  const [selected, setSelected] = useState(null);
  const rail = useRef(null);

  function jumpTo(id) {
    const section = document.getElementById(id);
    if (window.matchMedia('(max-width: 700px)').matches) {
      section.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else {
      rail.current.scrollTo({ left: section.offsetLeft - rail.current.offsetLeft, behavior: 'instant' });
    }
    section.querySelector('h2').focus({ preventScroll: true });
  }

  return (
    <>
          <div className="build-toolbar">
            <nav aria-label="Jump to a timeline period" className="build-jumps">
              {groups.map(group => <button key={group.id} onClick={() => jumpTo(group.id)}>{group.date}</button>)}
            </nav>
            <span className="build-dates-note">2026 · Approximate dates</span>
          </div>

          <div ref={rail} className="build-rail" role="region" aria-label="Project timeline" tabIndex={0}>
            <ol className="build-periods" style={{ '--period-count': groups.length }}>
              {groups.map(group => (
                <li className="build-period" id={group.id} key={group.id}>
                  <div className="build-date"><span className="build-node" aria-hidden="true" /><h2 tabIndex={-1}>{group.date}</h2></div>
                  <ol className="build-projects">
                    {group.projects.map(project => (
                      <li key={project.id}>
                        <article className="build-card">
                          <button className="build-preview" onClick={() => setSelected(project)} aria-label={`Enlarge ${project.name} screenshot`}>
                            <Screenshot project={project} />
                            <span className="build-expand" aria-hidden="true"><FiMaximize2 /></span>
                          </button>
                          <div className="build-card-copy">
                            <h3>{project.name}</h3>
                            <p className="build-description">{project.description}</p>
                            {projectLink(project) ? <a className="build-action" aria-label={`${project.name}: ${project.linkLabel}`} href={projectLink(project)} target="_blank" rel="noopener noreferrer">{project.videoId ? <FiPlay /> : <FiArrowUpRight />}{project.linkLabel}</a> : <button className="build-action" onClick={() => setSelected(project)}><FiMaximize2 />View screenshot</button>}
                            {project.github && <div className="build-repo-links"><a className="build-action" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`}><FiGithub />GitHub</a>{project.live && project.live !== project.github && <a className="build-action" href={project.live} target="_blank" rel="noopener noreferrer"><FiArrowUpRight />Website</a>}</div>}
                          </div>
                        </article>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} isCentered size="2xl">
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent className="matrix-dialog" bg="black" color="#00ff00" border="1px solid #00ff00" mx={4}>
          <ModalHeader fontFamily="Roboto, sans-serif" pr={12}>{selected?.name}</ModalHeader>
          <ModalCloseButton aria-label="Close screenshot" />
          <ModalBody pb={6}>
            {selected && <><div className="build-modal-image"><Screenshot project={selected} /></div>{projectLink(selected) && <a className="build-action" href={projectLink(selected)} target="_blank" rel="noopener noreferrer">{selected.linkLabel} <FiArrowUpRight /></a>}</>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
