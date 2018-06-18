<template>
    <div>
        <ResumeSection header="Education">
            <SmallEducationBlock title="Vilnius university" description="Computational physics"
                timePeriod="September 2012 - June 2016" location="Vilnius, Lithuania">
            </SmallEducationBlock>
            <SmallEducationBlock title="&quot;Fizikos olimpas&quot;" description="Additional private school"
                timePeriod="September 2009 - June 2012" location="Vilnius, Lithuania">
            </SmallEducationBlock>
            <SmallEducationBlock title="Gabija gymnasium" description="" timePeriod="September 2009 - June 2012"
                location="Mazeikiai, Lithuania">
            </SmallEducationBlock>
        </ResumeSection>

        <ResumeSection header="EXPERIENCE">
            <CompanySection name="NetCode" timePeriod="xasd" location="Vilnius, Lithuania">
                <ProjectSection name="Dispatch" role="Lead software developer" url="Private project"
                    timePeriod="2016 - 2017" description="Production system for orthopedic shoe factory">

                </ProjectSection>
                <ProjectSection name="AUIS IAE" role="Software developer" url="www.auis.iae.lt"
                    timePeriod="2015 - 2016" description="Ignalina nuclear power plant auction information system">

                </ProjectSection>
                <ProjectSection name="MIDAS" role="Software developer" url="www.midas.lt" timePeriod="2014 - 2015"
                    description="The national open access research data archive">

                </ProjectSection>
                <ProjectSection name="LKIIS" role="Software developer" url="www.lkiis.lki.lt"
                    timePeriod="2013 - 2014" description="Lithuanian language resource information system">

                </ProjectSection>
            </CompanySection>
            <CompanySection name="Siteimprove" timePeriod="Martch 5 2018 - Now">
                Adsasd asdasd asdas
            </CompanySection>
        </ResumeSection>
    </div>
</template>

<script>
import ResumeSection from "./ResumeSection.vue";
import SmallEducationBlock from "./education/SmallEducationBlock.vue";
import CompanySection from "./experience/CompanySection.vue";
import ProjectSection from "./experience/ProjectSection.vue";

export default {
  name: "resume",
  components: {
    ResumeSection,
    SmallEducationBlock,
    CompanySection,
    ProjectSection
  }
};
</script>

<style lang="scss">
</style>