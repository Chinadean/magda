package au.csiro.data61.magda.api

import au.csiro.data61.magda.model.misc.{DataSet, _}
import au.csiro.data61.magda.test.util.ApiGenerators._
import au.csiro.data61.magda.test.util.Generators

class FacetFormatGroupingSpec extends FacetSpecBase {

  describe("facets format grouping") {
    def reducer(dataSet: DataSet) = dataSet.distributions.flatMap(_.format.map(_.toLowerCase)).toSet
    def queryToInt(query: Query) = query.formats.size

    def filterQueryGen(dataSets: List[DataSet]) = Generators.smallSet(formatQueryGen(dataSets)).flatMap(formats => Query(formats = formats))
    def specificBiasedQueryGen(dataSets: List[DataSet]) = Query(formats = dataSets.flatMap(_.distributions.flatMap(_.format)).map(Specified.apply).toSet)

    genericFacetGroupingSpecs(Format, reducer, queryToInt, filterQueryGen, specificBiasedQueryGen)
  }
}
